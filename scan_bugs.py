import os

d = 'components'
for f in os.listdir(d):
    if f.endswith('.js') and f != 'contacts_data.js':
        path = os.path.join(d, f)
        content = open(path, 'r', encoding='utf-8').read()
        lines = content.split('\n')
        for i, line in enumerate(lines, 1):
            raw = repr(line)
            if '\\\\`' in raw or '\\\\${' in raw:
                print("BUG in " + f + " line " + str(i) + ": " + line.strip()[:100])
print('Scan complete')
