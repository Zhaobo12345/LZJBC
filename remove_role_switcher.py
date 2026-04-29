import re

html_file = r'd:\TraeProject\LZJPro\LZJBC\demo-miniapp\task-detail.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 移除用户视角切换部分
old_role_switcher = '''            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #E8E8E8;">
                <div class="page-nav-title">用户视角切换</div>
                <div class="status-switcher" id="roleSwitcher">
                    <div class="status-switch-item role-switch-item active" onclick="switchUserRole('executor')">执行人视角</div>
                    <div class="status-switch-item role-switch-item" onclick="switchUserRole('confirmer')">确认人视角</div>
                    <div class="status-switch-item role-switch-item" onclick="switchUserRole('configurer')">配置人视角</div>
                    <div class="status-switch-item role-switch-item" onclick="switchUserRole('other')">其他用户视角</div>
                </div>
                <div class="status-switcher" id="configuringRoleSwitcher" style="margin-top: 8px; display: none;">
                    <div class="status-switch-item role-switch-item active" onclick="switchUserRole('configurer')">配置人视角</div>
                    <div class="status-switch-item role-switch-item" onclick="switchUserRole('other')">其他用户视角</div>
                </div>
            </div>'''

content = content.replace(old_role_switcher, '')

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print('已移除用户视角切换内容')
print('操作完成！')