#!/usr/bin/env python3
"""Import the standalone browser lab, with its local runtime dependencies.

Python 3.9+ and Git only. No npm install, build hooks or remote scripts executed.
The default fetches the current default branch. --ref pins a commit/tag/branch;
--source imports an existing checkout (including its working-tree edits).
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

REPO = 'https://github.com/vecna/ghostmaxxing.git'
SITE = Path(__file__).resolve().parents[1]
TARGET = SITE / 'static/ghostati'
PREFIX = '/ghostati/'
PRODUCTION = 'https://ghostmaxxing.vecna.eu'
CANONICAL = 'https://sindacato.nina.watch/ghostati/'


def git(source, *args):
    return subprocess.check_output(['git', '-C', str(source), *args], text=True).strip()


def import_lab(source, requested_ref):
    for name in ['lab.html', 'lab-js/backend-url.js', 'lab-js/vendor/face-api.js',
                 'lab-js/vendor/face_landmarker.task', 'lab-js/vendor/wasm',
                 'data/face_canonical_uv.json', 'ghostyles.json']:
        if not (source / name).exists():
            raise RuntimeError(f'Missing {name}. Apply the Ghostmaxxing migration patch first; existing lab unchanged.')
    # A staging directory on the same filesystem makes the final rename safe.
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.ghostati-stage-', dir=TARGET.parent) as stage_dir:
        stage = Path(stage_dir) / 'lab'
        stage.mkdir()
        for name in ['lab-js', 'styles', 'ghostyles', 'data']:
            shutil.copytree(source / name, stage / name)
        # Keep all runtime image references local without importing editorial pages.
        # Full images directory also covers future Ghostyle assets and social previews.
        shutil.copytree(source / 'images', stage / 'images')
        shutil.copy2(source / 'ghostyles.json', stage / 'ghostyles.json')
        for name in ['LICENSE', 'LICENSE.md', 'COPYING']:
            if (source / name).exists():
                shutil.copy2(source / name, stage / name)
        original = (source / 'lab.html').read_text()
        html = original.replace(PRODUCTION + '/lab.html', CANONICAL)
        html = html.replace(PRODUCTION + '/images/', CANONICAL + 'images/')
        # Assets stay on this origin. Public software navigation goes to its website.
        def relocate(match):
            attr, quote, url = match.groups()
            if url.startswith(('/lab-js/', '/styles/', '/images/', '/data/', '/ghostyles/')):
                url = PREFIX + url.lstrip('/')
            elif url.startswith('/') and not url.startswith('//'):
                url = PRODUCTION + url
            return attr + '=' + quote + url + quote
        html = re.sub(r'''\b(src|href)=(['"])(/[^'"\s]*)\2''', relocate, html)
        (stage / 'index.html').write_text(html)
        # Retain the original filename as an entry point; no redirect involved.
        (stage / 'lab.html').write_text(html)
        commit = git(source, 'rev-parse', 'HEAD')
        status = git(source, 'status', '--porcelain', '--untracked-files=normal')
        metadata = {
            'repository': REPO, 'commit': commit, 'requested_ref': requested_ref,
            'working_tree_modified': bool(status),
            'source_changes': status.splitlines(),
            'entrypoint': PREFIX, 'canonical': CANONICAL,
            'sha256': {str(p.relative_to(stage)): hashlib.sha256(p.read_bytes()).hexdigest()
                       for p in sorted(stage.rglob('*')) if p.is_file()},
        }
        (stage / 'upstream.json').write_text(json.dumps(metadata, indent=2) + '\n')
        (stage / 'UPSTREAM.txt').write_text(
            f'Source: {REPO}\nCommit: {commit}\nLicence declared upstream: AGPL-3.0-or-later\n'
            'Brand and source attribution retained. Imported by scripts/update-ghostati-lab.py.\n'
            'Recognition assets are local; optional uploads and gallery use the configured backend.\n')
        # Validate the local HTML asset set before replacing anything.
        for url in re.findall(r'''(?:src|href)=['"](/ghostati/[^'"?#]*)''', html):
            if not (stage / url.removeprefix(PREFIX)).exists():
                raise RuntimeError(f'Missing imported asset: {url}')
        backup = Path(stage_dir) / 'previous'
        if TARGET.is_symlink():
            raise RuntimeError('Refusing to replace a symlink at static/ghostati')
        if TARGET.exists():
            os.replace(TARGET, backup)
        try:
            os.replace(stage, TARGET)
        except BaseException:
            if backup.exists():
                os.replace(backup, TARGET)
            raise
        print(f'Imported {commit} into {TARGET}; modified source: {bool(status)}')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ref', help='Optional upstream branch, tag or commit SHA')
    parser.add_argument('--source', type=Path, help='Use this local checkout instead of fetching')
    args = parser.parse_args()
    if args.source:
        if args.ref:
            parser.error('--source and --ref cannot be combined')
        import_lab(args.source.resolve(), 'local-working-tree')
    else:
        with tempfile.TemporaryDirectory(prefix='ghostati-upstream-') as temp:
            source = Path(temp) / 'source'
            subprocess.run(['git', 'clone', '--depth', '1', REPO, str(source)], check=True)
            if args.ref:
                subprocess.run(['git', '-C', str(source), 'fetch', '--depth', '1', 'origin', args.ref], check=True)
                subprocess.run(['git', '-C', str(source), 'checkout', '--detach', 'FETCH_HEAD'], check=True)
            import_lab(source, args.ref or 'default-branch')


if __name__ == '__main__':
    main()
