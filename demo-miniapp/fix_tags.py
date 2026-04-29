import os

# 定义要修改的文件列表
files = [
    'project-info.html',
    'contract-detail.html',
    'task-list.html',
    'member.html',
    'architecture.html',
    'activity-list.html',
    'project-files.html'
]

# 遍历所有文件并修改
for filename in files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 修复闭合标签问题
        content = content.replace('            </div>\n            </div>\n\n    <script>', '            </div>\n        </div>\n    </div>\n\n    <script>')
        
        # 写入文件
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed: {filename}')
    else:
        print(f'File not found: {filename}')

print('All files fixed!')
