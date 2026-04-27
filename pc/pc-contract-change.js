
        let currentPcRole = 'initiator';
        let isSequential = false;
        let newStageCounter = 100;
        let currentEditTaskType = 'new';
        let currentEditTaskId = null;
        let selectedConfirmers = [];
        let selectedExecutor = null;
        let currentStageId = null;
        let newTaskCounter = 1000;
        let contractAttachments = [
            { id: '1', name: '变更附件-新增点位图纸.pdf', size: 1024000, type: 'pdf', ext: 'pdf' },
            { id: '2', name: '变更确认单.docx', size: 256000, type: 'word', ext: 'docx' }
        ];

        // 项目内人员数据
        const projectUsers = [
            { id: 1, name: '张三', role: '项目经理', avatar: '👨‍💼' },
            { id: 2, name: '李四', role: '监理', avatar: '👷‍♂️' },
            { id: 3, name: '王五', role: '业主', avatar: '🏠' },
            { id: 4, name: '赵六', role: '材料员', avatar: '📦' },
            { id: 5, name: '钱七', role: '电工组', avatar: '🔧' },
            { id: 6, name: '孙八', role: '弱电组', avatar: '📡' },
            { id: 7, name: '周九', role: '水电工', avatar: '💧' },
            { id: 8, name: '吴十', role: '泥瓦工', avatar: '🧱' },
            { id: 9, name: '郑十一', role: '木工', avatar: '🪚' },
            { id: 10, name: '王十二', role: '油漆工', avatar: '🎨' },
            { id: 11, name: '陈十三', role: '清洁工', avatar: '🧹' }
        ];

        function switchPcRole(role, evt) {
            currentPcRole = role;
            
            document.querySelectorAll('.pc-role-switcher .pc-role-btn').forEach(btn => btn.classList.remove('active'));
            evt.target.classList.add('active');
            
            if (role === 'initiator') {
                window.location.href = 'pc-contract-edit.html';
            } else {
                window.location.href = 'pc-contract-list.html';
            }
        }

        function toggleStage(header) {
            const body = header.nextElementSibling;
            if (body.style.display === 'none') {
                body.style.display = 'block';
            } else {
                body.style.display = 'none';
            }
        }

        function addStage() {
            isSequential = false;
            document.getElementById('addStageModal').classList.add('show');
            document.getElementById('newStageName').value = '';
            document.getElementById('sequentialSwitch').classList.remove('on');
        }

        function closeAddStageModal() {
            document.getElementById('addStageModal').classList.remove('show');
        }

        function toggleSequential() {
            isSequential = !isSequential;
            document.getElementById('sequentialSwitch').classList.toggle('on', isSequential);
        }

        function saveNewStage() {
            const stageName = document.getElementById('newStageName').value.trim();
            if (!stageName) {
                showToast('请输入阶段名称');
                return;
            }
            
            const stageId = newStageCounter++;
            const stageList = document.getElementById('stageList');
            const newStageHtml = `
                <div class="stage-item stage-added" data-stage-id="${stageId}">
                    <div class="stage-header" onclick="toggleStage(this)">
                        <div class="stage-info">
                            <span class="stage-name">${stageName}</span>
                            ${isSequential ? '<span class="stage-sequential">按序执行</span>' : ''}
                            <span class="change-badge added">新增</span>
                        </div>
                        <div class="stage-actions">
                            <button class="pc-btn pc-btn-text pc-btn-sm" onclick="event.stopPropagation(); editStage(${stageId})">编辑</button>
                            <button class="pc-btn pc-btn-text pc-btn-sm" onclick="event.stopPropagation(); deleteNewStage(${stageId})">删除</button>
                            <span style="color: var(--text-tertiary);">▼</span>
                        </div>
                    </div>
                    <div class="stage-body" style="display: block;">
                        <button class="pc-btn pc-btn-default pc-btn-sm mt-8" onclick="addTask(${stageId})">+ 添加任务</button>
                    </div>
                </div>
            `;
            
            const addBtn = document.querySelector('.add-stage-btn');
            addBtn.insertAdjacentHTML('beforebegin', newStageHtml);
            
            closeAddStageModal();
            showToast('阶段已添加');
        }

        function deleteNewStage(stageId) {
            if (confirm('确定要删除此阶段吗？')) {
                const stageItem = document.querySelector(`.stage-item[data-stage-id="${stageId}"]`);
                if (stageItem) {
                    stageItem.style.transition = 'all 0.3s';
                    stageItem.style.opacity = '0';
                    stageItem.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        stageItem.remove();
                        showToast('阶段已删除');
                    }, 300);
                }
            }
        }

        function editStage(id) {
            console.log('editStage called with id:', id);
            const stageItem = document.querySelector(`.stage-item[data-stage-id="${id}"]`) || Array.from(document.querySelectorAll('.stage-item')).find((item, index) => {
                const editBtn = item.querySelector('button[onclick*="editStage"]');
                if (editBtn) {
                    const onclickAttr = editBtn.getAttribute('onclick');
                    const match = onclickAttr.match(/editStage\((\d+)\)/);
                    return match && parseInt(match[1]) === id;
                }
                return false;
            });
            
            if (!stageItem) {
                showToast('未找到阶段');
                return;
            }
            
            const stageName = stageItem.querySelector('.stage-name').textContent;
            const isSequential = stageItem.querySelector('.stage-sequential') !== null;
            
            document.getElementById('editStageId').value = id;
            document.getElementById('editStageName').value = stageName;
            document.getElementById('editStageSequential').checked = isSequential;
            
            document.getElementById('stageEditModal').classList.add('show');
        }
        
        function closeStageEditModal() {
            document.getElementById('stageEditModal').classList.remove('show');
        }
        
        function saveStageEdit() {
            const id = document.getElementById('editStageId').value;
            const name = document.getElementById('editStageName').value.trim();
            const isSequential = document.getElementById('editStageSequential').checked;
            
            if (!name) {
                showToast('请输入阶段名称');
                return;
            }
            
            const stageItem = document.querySelector(`.stage-item[data-stage-id="${id}"]`) || Array.from(document.querySelectorAll('.stage-item')).find((item, index) => {
                const editBtn = item.querySelector('button[onclick*="editStage"]');
                if (editBtn) {
                    const onclickAttr = editBtn.getAttribute('onclick');
                    const match = onclickAttr.match(/editStage\((\d+)\)/);
                    return match && parseInt(match[1]) === parseInt(id);
                }
                return false;
            });
            
            if (!stageItem) {
                showToast('未找到阶段');
                return;
            }
            
            stageItem.querySelector('.stage-name').textContent = name;
            
            const stageInfo = stageItem.querySelector('.stage-info');
            const sequentialSpan = stageItem.querySelector('.stage-sequential');
            
            if (isSequential && !sequentialSpan) {
                const newSequentialSpan = document.createElement('span');
                newSequentialSpan.className = 'stage-sequential';
                newSequentialSpan.textContent = '按序执行';
                stageInfo.appendChild(newSequentialSpan);
            } else if (!isSequential && sequentialSpan) {
                sequentialSpan.remove();
            }
            
            closeStageEditModal();
            showToast('阶段信息已保存');
        }

        function deleteStage(id) {
            if (confirm('确定要删除此阶段吗？')) {
                showToast('已删除阶段：' + id);
            }
        }

        function restoreStage(id) {
            showToast('已恢复阶段：' + id);
        }

        function addTask(stageId) {
            currentStageId = stageId;
            currentEditTaskId = null;
            currentEditTaskType = 'new';
            document.getElementById('editTaskModalTitle').textContent = '添加新任务';
            document.getElementById('taskChangeDiff').style.display = 'none';
            
            document.getElementById('editTaskName').value = '';
            document.getElementById('editTaskExecutor').value = '';
            document.getElementById('selectedExecutor').innerHTML = '';
            document.getElementById('editTaskConfirmer').value = '';
            document.getElementById('selectedConfirmers').innerHTML = '';
            document.getElementById('editExecuteStandard').value = '';
            document.getElementById('editConfirmStandard').value = '';
            document.getElementById('editResponsibleStandard').value = '';
            
            document.getElementById('editTaskModal').classList.add('show');
        }

        function closeEditTaskModal() {
            document.getElementById('editTaskModal').classList.remove('show');
            document.querySelectorAll('.highlight-input').forEach(el => el.classList.remove('highlight-input'));
        }

        // 搜索用户函数
        function searchUsers(type) {
            const searchInput = document.getElementById(`${type}Search`);
            const dropdown = document.getElementById(`${type}Dropdown`);
            const searchTerm = searchInput.value.toLowerCase();
            
            let filteredUsers = projectUsers;
            if (searchTerm.length > 0) {
                filteredUsers = projectUsers.filter(user => 
                    user.name.toLowerCase().includes(searchTerm) || 
                    user.role.toLowerCase().includes(searchTerm)
                );
            }
            
            dropdown.innerHTML = filteredUsers.map(user => `
                <div class="user-item" onclick="selectUser('${type}', ${user.id})">
                    <span class="user-avatar">${user.avatar}</span>
                    <span class="user-info">
                        <span class="user-name">${user.name}</span>
                        <span class="user-role">${user.role}</span>
                    </span>
                </div>
            `).join('');
            
            dropdown.style.display = filteredUsers.length > 0 ? 'block' : 'none';
        }

        // 为搜索框添加点击事件，点击时显示所有人员
        document.addEventListener('DOMContentLoaded', function() {
            const executorSearch = document.getElementById('executorSearch');
            if (executorSearch) {
                executorSearch.addEventListener('click', function() {
                    searchUsers('executor');
                });
            }
            
            const confirmerSearch = document.getElementById('confirmerSearch');
            if (confirmerSearch) {
                confirmerSearch.addEventListener('click', function() {
                    searchUsers('confirmer');
                });
            }
        });

        // 选择用户函数
        function selectUser(type, userId) {
            const user = projectUsers.find(u => u.id === userId);
            if (!user) return;
            
            if (type === 'executor') {
                // 执行人只能选择一个
                document.getElementById('editTaskExecutor').value = `${user.name}(${user.role})`;
                document.getElementById('selectedExecutor').innerHTML = `
                    <div class="selected-user-tag">
                        <span class="user-avatar">${user.avatar}</span>
                        <span>${user.name}(${user.role})</span>
                        <span class="remove-user" onclick="removeUser('executor')">×</span>
                    </div>
                `;
                document.getElementById('executorDropdown').style.display = 'none';
                document.getElementById('executorSearch').value = '';
            } else if (type === 'confirmer') {
                // 确认人最多选择5个
                const selectedConfirmers = document.getElementById('selectedConfirmers');
                const currentCount = selectedConfirmers.children.length;
                
                if (currentCount >= 5) {
                    showToast('确认人最多选择5个');
                    return;
                }
                
                // 检查是否已经选择
                const existingUsers = Array.from(selectedConfirmers.children).map(tag => 
                    tag.querySelector('span:nth-child(2)').textContent
                );
                
                const userText = `${user.name}(${user.role})`;
                if (existingUsers.includes(userText)) {
                    showToast('该人员已选择');
                    return;
                }
                
                selectedConfirmers.insertAdjacentHTML('beforeend', `
                    <div class="selected-user-tag">
                        <span class="user-avatar">${user.avatar}</span>
                        <span>${userText}</span>
                        <span class="remove-user" onclick="removeUser('confirmer', this)">×</span>
                    </div>
                `);
                
                // 更新隐藏输入值
                updateConfirmerValue();
                
                document.getElementById('confirmerDropdown').style.display = 'none';
                document.getElementById('confirmerSearch').value = '';
            }
        }

        // 移除用户函数
        function removeUser(type, element) {
            if (type === 'executor') {
                document.getElementById('editTaskExecutor').value = '';
                document.getElementById('selectedExecutor').innerHTML = '';
            } else if (type === 'confirmer' && element) {
                element.parentElement.remove();
                updateConfirmerValue();
            }
        }

        // 更新确认人隐藏输入值
        function updateConfirmerValue() {
            const selectedConfirmers = document.getElementById('selectedConfirmers');
            const confirmers = Array.from(selectedConfirmers.children).map(tag => 
                tag.querySelector('span:nth-child(2)').textContent
            );
            document.getElementById('editTaskConfirmer').value = confirmers.join('、');
        }

        // 点击其他地方关闭下拉框
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-selector')) {
                const executorDropdown = document.getElementById('executorDropdown');
                const confirmerDropdown = document.getElementById('confirmerDropdown');
                if (executorDropdown) executorDropdown.style.display = 'none';
                if (confirmerDropdown) confirmerDropdown.style.display = 'none';
            }
        });

        function editTask(stageId, taskIndex) {
            // 处理两种情况：
            // 1. 只传递一个参数（taskId）
            // 2. 传递两个参数（stageId, taskIndex）
            let taskId;
            if (taskIndex === undefined) {
                // 只传递了一个参数，作为taskId
                taskId = stageId;
            } else {
                // 传递了两个参数，组合成taskId
                taskId = `${stageId}_${taskIndex}`;
            }
            
            currentEditTaskId = taskId;
            const allTaskItems = document.querySelectorAll('.task-item');
            let taskItem = null;
            
            // 遍历所有任务项，查找onclick属性中包含editTask的按钮
            for (let item of allTaskItems) {
                const buttons = item.querySelectorAll('button');
                for (let btn of buttons) {
                    const onclickAttr = btn.getAttribute('onclick');
                    if (onclickAttr) {
                        // 检查是否包含editTask(taskId)或editTask(stageId, taskIndex)
                        if (taskIndex === undefined) {
                            // 只传递了一个参数的情况
                            if (onclickAttr.includes(`editTask(${taskId})`)) {
                                taskItem = item;
                                break;
                            }
                        } else {
                            // 传递了两个参数的情况
                            if (onclickAttr.includes(`editTask(${stageId}, ${taskIndex})`)) {
                                taskItem = item;
                                break;
                            }
                        }
                    }
                }
                if (taskItem) break;
            }
            
            // 如果没有找到，尝试通过data-task-id属性查找
            if (!taskItem) {
                taskItem = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
            }
            
            // 如果没有找到，尝试通过索引查找（仅当taskId是数字时）
            if (!taskItem && typeof taskId === 'number') {
                const taskItems = document.querySelectorAll('.task-item');
                if (taskItems.length > taskId - 1) {
                    taskItem = taskItems[taskId - 1];
                }
            }
            
            if (!taskItem) {
                showToast('未找到任务');
                return;
            }
            
            if (taskItem.classList.contains('disabled')) {
                showToast('此任务不支持编辑');
                return;
            }
            
            if (taskItem.classList.contains('task-added')) {
                currentEditTaskType = 'new';
                document.getElementById('editTaskModalTitle').textContent = '编辑新增任务';
                document.getElementById('taskChangeDiff').style.display = 'none';
                
                const taskName = taskItem.querySelector('.task-name').textContent;
                const taskMeta = taskItem.querySelector('.task-meta').textContent;
                
                document.getElementById('editTaskName').value = taskName;
                
                const metaMatch = taskMeta.match(/执行人：(.+?) \| 确认人：(.+)/);
                if (metaMatch) {
                    // 清空之前的选择
                    document.getElementById('editTaskExecutor').value = '';
                    document.getElementById('selectedExecutor').innerHTML = '';
                    document.getElementById('editTaskConfirmer').value = '';
                    document.getElementById('selectedConfirmers').innerHTML = '';
                    
                    // 设置执行人
                    const executor = metaMatch[1];
                    document.getElementById('editTaskExecutor').value = executor;
                    document.getElementById('selectedExecutor').innerHTML = `
                        <div class="selected-user-tag">
                            <span class="user-avatar">👤</span>
                            <span>${executor}</span>
                            <span class="remove-user" onclick="removeUser('executor')">×</span>
                        </div>
                    `;
                    
                    // 设置确认人
                    const confirmers = metaMatch[2].split('、');
                    const selectedConfirmersContainer = document.getElementById('selectedConfirmers');
                    confirmers.forEach(c => {
                        selectedConfirmersContainer.insertAdjacentHTML('beforeend', `
                            <div class="selected-user-tag">
                                <span class="user-avatar">👤</span>
                                <span>${c}</span>
                                <span class="remove-user" onclick="removeUser('confirmer', this)">×</span>
                            </div>
                        `);
                    });
                    document.getElementById('editTaskConfirmer').value = confirmers.join('、');
                }
                
                document.getElementById('editExecuteStandard').value = '按照规范进行布线施工，确保线路走向合理、固定牢固';
                document.getElementById('editConfirmStandard').value = '检查布线是否符合设计要求，线路是否通畅';
                document.getElementById('editResponsibleStandard').value = '因施工质量问题导致的返工由执行人承担';
            } else if (taskItem.classList.contains('task-modified')) {
                currentEditTaskType = 'modified';
                document.getElementById('editTaskModalTitle').textContent = '编辑已修改任务';
                document.getElementById('taskChangeDiff').style.display = 'block';
                
                document.getElementById('taskDiffContent').innerHTML = `
                    <div class="change-diff-row">
                        <span class="change-diff-label">执行人：</span>
                        <span class="change-diff-old">电工组</span>
                        <span>→</span>
                        <span class="change-diff-new">电工组（已调整）</span>
                    </div>
                    <div class="change-diff-row">
                        <span class="change-diff-label">确认人：</span>
                        <span class="change-diff-old">项目经理</span>
                        <span>→</span>
                        <span class="change-diff-new">项目经理、业主</span>
                    </div>
                    <div class="change-diff-row">
                        <span class="change-diff-label">执行标准：</span>
                        <span class="change-diff-old">按规范施工</span>
                        <span>→</span>
                        <span class="change-diff-new">按最新规范施工，增加验收环节</span>
                    </div>
                `;
                
                const taskName = taskItem.querySelector('.task-name').textContent;
                const taskMeta = taskItem.querySelector('.task-meta').textContent;
                
                document.getElementById('editTaskName').value = taskName;
                document.getElementById('editTaskName').classList.add('highlight-input');
                
                const metaMatch = taskMeta.match(/执行人：(.+?) \| 确认人：(.+)/);
                if (metaMatch) {
                    // 清空之前的选择
                    document.getElementById('editTaskExecutor').value = '';
                    document.getElementById('selectedExecutor').innerHTML = '';
                    document.getElementById('editTaskConfirmer').value = '';
                    document.getElementById('selectedConfirmers').innerHTML = '';
                    
                    // 设置执行人
                    const executor = metaMatch[1];
                    document.getElementById('editTaskExecutor').value = executor;
                    document.getElementById('selectedExecutor').innerHTML = `
                        <div class="selected-user-tag">
                            <span class="user-avatar">👤</span>
                            <span>${executor}</span>
                            <span class="remove-user" onclick="removeUser('executor')">×</span>
                        </div>
                    `;
                    
                    // 设置确认人
                    const confirmers = metaMatch[2].split('、');
                    const selectedConfirmersContainer = document.getElementById('selectedConfirmers');
                    confirmers.forEach(c => {
                        selectedConfirmersContainer.insertAdjacentHTML('beforeend', `
                            <div class="selected-user-tag">
                                <span class="user-avatar">👤</span>
                                <span>${c}</span>
                                <span class="remove-user" onclick="removeUser('confirmer', this)">×</span>
                            </div>
                        `);
                    });
                    document.getElementById('editTaskConfirmer').value = confirmers.join('、');
                }
                
                document.getElementById('editExecuteStandard').value = '按最新规范施工，增加验收环节';
                document.getElementById('editExecuteStandard').classList.add('highlight-input');
                document.getElementById('editConfirmStandard').value = '检查布线是否符合设计要求，线路是否通畅，业主现场确认';
                document.getElementById('editConfirmStandard').classList.add('highlight-input');
                document.getElementById('editResponsibleStandard').value = '因施工质量问题导致的返工由执行人承担';
            } else {
                showToast('此任务不支持编辑');
                return;
            }
            
            document.getElementById('editTaskModal').classList.add('show');
        }

        function toggleExecutorDropdown() {
            const dropdown = document.getElementById('executorDropdown');
            const confirmerDropdown = document.getElementById('confirmerDropdown');
            confirmerDropdown.classList.remove('show');
            dropdown.classList.toggle('show');
        }

        function selectExecutor(name, role) {
            selectedExecutor = { name, role };
            document.getElementById('executorInput').value = `${name}（${role}）`;
            document.getElementById('executorDropdown').classList.remove('show');
        }

        function toggleConfirmerDropdown() {
            const dropdown = document.getElementById('confirmerDropdown');
            const executorDropdown = document.getElementById('executorDropdown');
            executorDropdown.classList.remove('show');
            dropdown.classList.toggle('show');
        }

        function toggleConfirmer(name, role) {
            const existing = selectedConfirmers.find(c => c.name === name);
            if (existing) {
                selectedConfirmers = selectedConfirmers.filter(c => c.name !== name);
            } else {
                if (selectedConfirmers.length >= 5) {
                    showToast('确认人最多选择5人');
                    return;
                }
                selectedConfirmers.push({ name, role });
            }
            renderConfirmerTags();
            updateConfirmerOptions();
        }

        function renderConfirmerTags() {
            const container = document.getElementById('confirmerTags');
            container.innerHTML = selectedConfirmers.map(c => `
                <div class="person-tag">
                    <span>${c.name}（${c.role}）</span>
                    <span class="remove" onclick="removeConfirmer('${c.name}')">×</span>
                </div>
            `).join('');
        }

        function removeConfirmer(name) {
            selectedConfirmers = selectedConfirmers.filter(c => c.name !== name);
            renderConfirmerTags();
            updateConfirmerOptions();
        }

        function updateConfirmerOptions() {
            const options = document.querySelectorAll('#confirmerDropdown .person-select-option');
            options.forEach(opt => {
                const name = opt.querySelector('span:last-child').textContent.split('（')[0];
                if (selectedConfirmers.find(c => c.name === name)) {
                    opt.classList.add('selected');
                    // 添加确认标识
                    if (!opt.querySelector('.checkmark')) {
                        const checkmark = document.createElement('span');
                        checkmark.className = 'checkmark';
                        checkmark.innerHTML = '✓';
                        opt.appendChild(checkmark);
                    }
                } else {
                    opt.classList.remove('selected');
                    // 移除确认标识
                    const checkmark = opt.querySelector('.checkmark');
                    if (checkmark) {
                        checkmark.remove();
                    }
                }
            });
        }

        function saveTask() {
            const taskName = document.getElementById('editTaskName').value.trim();
            const executeStandard = document.getElementById('editExecuteStandard').value.trim();
            const confirmStandard = document.getElementById('editConfirmStandard').value.trim();
            const responsibleStandard = document.getElementById('editResponsibleStandard').value.trim();
            const executor = document.getElementById('editTaskExecutor').value || '未指定';
            const confirmerNames = document.getElementById('editTaskConfirmer').value || '未指定';
            
            if (!taskName) {
                showToast('请输入任务名称');
                return;
            }
            if (!executeStandard) {
                showToast('请输入执行标准');
                return;
            }
            if (!confirmStandard) {
                showToast('请输入确认标准');
                return;
            }
            if (!responsibleStandard) {
                showToast('请输入担责标准');
                return;
            }
            
            if (currentEditTaskType === 'new' && !currentEditTaskId) {
                const newTaskId = newTaskCounter++;
                const newTaskHtml = `
                    <div class="task-item task-added" data-task-id="${newTaskId}">
                        <div class="task-info">
                            <span class="task-name">${taskName}</span>
                            <span class="task-meta">执行人：${executor} | 确认人：${confirmerNames}</span>
                            <span class="change-badge added">新增</span>
                        </div>
                        <div class="flex gap-8">
                            <button class="pc-btn pc-btn-text pc-btn-sm" onclick="editTask(${newTaskId})">编辑</button>
                            <button class="pc-btn pc-btn-text pc-btn-sm" onclick="deleteTask(${newTaskId})">删除</button>
                        </div>
                    </div>
                `;
                
                const addBtn = document.querySelector(`button[onclick="addTask(${currentStageId})"]`);
                if (addBtn) {
                    addBtn.insertAdjacentHTML('beforebegin', newTaskHtml);
                }
            } else if (currentEditTaskId) {
                const allTaskItems = document.querySelectorAll('.task-item');
                for (let item of allTaskItems) {
                    const buttons = item.querySelectorAll('button');
                    let found = false;
                    for (let btn of buttons) {
                        const onclickAttr = btn.getAttribute('onclick');
                        if (onclickAttr && (onclickAttr.includes(`editTask(${currentEditTaskId})`) || onclickAttr.includes(`deleteTask(${currentEditTaskId})`))) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        item.querySelector('.task-name').textContent = taskName;
                        item.querySelector('.task-meta').textContent = `执行人：${executor} | 确认人：${confirmerNames}`;
                        item.setAttribute('data-task-id', currentEditTaskId);
                        break;
                    }
                }
            }
            
            closeEditTaskModal();
            showToast('任务已保存');
        }

        function deleteTask(stageId, taskIndex) {
            // 处理两种情况：
            // 1. 只传递一个参数（taskId）
            // 2. 传递两个参数（stageId, taskIndex）
            let taskId;
            if (taskIndex === undefined) {
                // 只传递了一个参数，作为taskId
                taskId = stageId;
            } else {
                // 传递了两个参数，组合成taskId
                taskId = `${stageId}_${taskIndex}`;
            }
            
            const allTaskItems = document.querySelectorAll('.task-item');
            let taskItem = null;
            
            // 遍历所有任务项，查找onclick属性中包含deleteTask的按钮
            for (let item of allTaskItems) {
                const buttons = item.querySelectorAll('button');
                for (let btn of buttons) {
                    const onclickAttr = btn.getAttribute('onclick');
                    if (onclickAttr) {
                        // 检查是否包含deleteTask(taskId)或deleteTask(stageId, taskIndex)
                        if (taskIndex === undefined) {
                            // 只传递了一个参数的情况
                            if (onclickAttr.includes(`deleteTask(${taskId})`)) {
                                taskItem = item;
                                break;
                            }
                        } else {
                            // 传递了两个参数的情况
                            if (onclickAttr.includes(`deleteTask(${stageId}, ${taskIndex})`)) {
                                taskItem = item;
                                break;
                            }
                        }
                    }
                }
                if (taskItem) break;
            }
            
            // 如果没有找到，尝试通过data-task-id属性查找
            if (!taskItem) {
                taskItem = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
            }
            
            // 如果没有找到，尝试通过索引查找（仅当taskId是数字时）
            if (!taskItem && typeof taskId === 'number') {
                const taskItems = document.querySelectorAll('.task-item');
                if (taskItems.length > taskId - 1) {
                    taskItem = taskItems[taskId - 1];
                }
            }
            
            if (!taskItem) {
                showToast('未找到任务');
                return;
            }
            
            if (taskItem.classList.contains('disabled')) {
                showToast('已完成或进行中的任务不支持删除');
                return;
            }
            
            if (confirm('确定要删除此任务吗？')) {
                // 为删除的任务添加删除标识和样式
                taskItem.classList.add('task-deleted');
                taskItem.style.opacity = '0.6';
                taskItem.style.backgroundColor = '#FFF1F0';
                
                // 禁用删除的任务的编辑和删除按钮
                const buttons = taskItem.querySelectorAll('button');
                buttons.forEach(btn => {
                    btn.disabled = true;
                    btn.classList.add('btn-disabled');
                    btn.onclick = function() { showToast('已删除的任务不支持操作'); };
                });
                
                // 添加删除标识
                const taskInfo = taskItem.querySelector('.task-info');
                if (taskInfo && !taskInfo.querySelector('.change-badge.deleted')) {
                    const deleteBadge = document.createElement('span');
                    deleteBadge.className = 'change-badge deleted';
                    deleteBadge.textContent = '已删除';
                    taskInfo.appendChild(deleteBadge);
                }
                
                showToast('任务已删除');
            }
        }

        // 合同文本模板数据
        const contractTemplates = [
            {
                id: 1,
                name: '水电分包合同模板',
                category: '分包合同',
                type: '水电工程',
                city: '杭州',
                version: 'v2.0',
                status: 'active',
                desc: '适用于水电工程分包业务的标准合同模板',
                updateTime: '2024-01-10 14:30',
                content: `<h3 style="text-align: center; margin-bottom: 20px;">水电分包合同（变更版）</h3>
<p><strong>甲方：</strong>杭州绿城装饰工程有限公司</p>
<p><strong>乙方：</strong>杭州水电安装有限公司</p>
<br>
<p>根据《中华人民共和国合同法》及相关法律法规，甲乙双方本着平等、自愿、公平、诚实信用的原则，就水电工程分包事宜，经协商一致，签订本合同。</p>
<br>
<h4>第一条 工程概况</h4>
<p>1.1 工程名称：绿城桃花源项目水电工程</p>
<p>1.2 工程地点：杭州市西湖区</p>
<p>1.3 承包范围：强电、弱电、给排水等水电安装工程</p>
<br>
<h4>第二条 合同价款</h4>
<p>2.1 本合同总价款为人民币壹拾捌万元整（¥180,000.00）</p>
<p>2.2 合同价款为固定总价，不因市场价格波动而调整</p>
<br>
<h4 style="color: var(--error-color);">【变更条款】</h4>
<p style="color: var(--error-color);">因业主需求变更，增加水电点位30个，合同金额由原150,000元调整为180,000元。</p>`
            },
            {
                id: 2,
                name: '泥瓦分包合同模板',
                category: '分包合同',
                type: '泥瓦工程',
                city: '杭州',
                version: 'v1.5',
                status: 'active',
                desc: '适用于泥瓦工程分包业务的标准合同模板',
                updateTime: '2024-01-08 10:20',
                content: `<h3 style="text-align: center; margin-bottom: 20px;">泥瓦分包合同（变更版）</h3>
<p><strong>甲方：</strong>杭州绿城装饰工程有限公司</p>
<p><strong>乙方：</strong>杭州泥瓦工程有限公司</p>
<br>
<p>根据《中华人民共和国合同法》及相关法律法规，甲乙双方就泥瓦工程分包事宜签订本合同。</p>
<br>
<h4>第一条 工程概况</h4>
<p>1.1 工程名称：绿城桃花源项目泥瓦工程</p>
<p>1.2 工程地点：杭州市西湖区</p>
<p>1.3 承包范围：防水处理、贴砖施工等泥瓦工程</p>
<br>
<h4>第二条 合同价款</h4>
<p>2.1 本合同总价款为人民币壹拾贰万元整（¥120,000.00）</p>
<p>2.2 合同价款为固定总价，不因市场价格波动而调整</p>
<br>
<h4 style="color: var(--error-color);">【变更条款】</h4>
<p style="color: var(--error-color);">因设计变更，增加卫生间防水面积，合同金额由原100,000元调整为120,000元。</p>`
            },
            {
                id: 3,
                name: '木工分包合同模板',
                category: '分包合同',
                type: '木工工程',
                city: '杭州',
                version: 'v1.2',
                status: 'active',
                desc: '适用于木工工程分包业务的标准合同模板',
                updateTime: '2024-01-05 16:45',
                content: `<h3 style="text-align: center; margin-bottom: 20px;">木工分包合同（变更版）</h3>
<p><strong>甲方：</strong>杭州绿城装饰工程有限公司</p>
<p><strong>乙方：</strong>杭州木工工程有限公司</p>
<br>
<p>根据《中华人民共和国合同法》及相关法律法规，甲乙双方就木工工程分包事宜签订本合同。</p>
<br>
<h4>第一条 工程概况</h4>
<p>1.1 工程名称：绿城桃花源项目木工工程</p>
<p>1.2 工程地点：杭州市西湖区</p>
<p>1.3 承包范围：木作施工、家具制作等木工工程</p>
<br>
<h4>第二条 合同价款</h4>
<p>2.1 本合同总价款为人民币壹拾伍万元整（¥150,000.00）</p>
<p>2.2 合同价款为固定总价，不因市场价格波动而调整</p>
<br>
<h4 style="color: var(--error-color);">【变更条款】</h4>
<p style="color: var(--error-color);">因业主需求变更，增加定制衣柜，合同金额由原120,000元调整为150,000元。</p>`
            },
            {
                id: 4,
                name: '油漆分包合同模板',
                category: '分包合同',
                type: '油漆工程',
                city: '杭州',
                version: 'v1.0',
                status: 'active',
                desc: '适用于油漆工程分包业务的标准合同模板',
                updateTime: '2024-01-03 09:15',
                content: `<h3 style="text-align: center; margin-bottom: 20px;">油漆分包合同（变更版）</h3>
<p><strong>甲方：</strong>杭州绿城装饰工程有限公司</p>
<p><strong>乙方：</strong>杭州油漆工程有限公司</p>
<br>
<p>根据《中华人民共和国合同法》及相关法律法规，甲乙双方就油漆工程分包事宜签订本合同。</p>
<br>
<h4>第一条 工程概况</h4>
<p>1.1 工程名称：绿城桃花源项目油漆工程</p>
<p>1.2 工程地点：杭州市西湖区</p>
<p>1.3 承包范围：墙面油漆、家具油漆等油漆工程</p>
<br>
<h4>第二条 合同价款</h4>
<p>2.1 本合同总价款为人民币捌万元整（¥80,000.00）</p>
<p>2.2 合同价款为固定总价，不因市场价格波动而调整</p>
<br>
<h4 style="color: var(--error-color);">【变更条款】</h4>
<p style="color: var(--error-color);">因业主需求变更，增加墙面艺术漆，合同金额由原60,000元调整为80,000元。</p>`
            },
            {
                id: 5,
                name: '水电分包合同模板（全国版）',
                category: '分包合同',
                type: '水电工程',
                city: '全国',
                version: 'v1.0',
                status: 'active',
                desc: '适用于全国范围的水电工程分包合同模板',
                updateTime: '2024-01-01 08:00',
                content: `<h3 style="text-align: center; margin-bottom: 20px;">水电分包合同（全国版）</h3>
<p><strong>甲方：</strong>杭州绿城装饰工程有限公司</p>
<p><strong>乙方：</strong>杭州水电安装有限公司</p>
<br>
<p>根据《中华人民共和国合同法》及相关法律法规，甲乙双方就水电工程分包事宜签订本合同。</p>`
            }
        ];

        let currentContractInfo = {
            city: '杭州',
            type: '水电工程',
            category: '分包合同'
        };

        let selectedTemplateId = null;

        // 阶段任务模板数据
        const stageTemplates = [
            {
                id: 1,
                name: '水电施工阶段模板',
                type: '水电工程',
                city: '杭州',
                status: 'active',
                stageCount: 3,
                taskCount: 8,
                updateTime: '2024-01-10 14:30',
                stages: [
                    { name: '材料进场', order: true, tasks: [
                        { name: '材料验收', 
                          executionStandard: '材料品牌、规格、数量符合合同要求', 
                          confirmationStandard: '现场清点数量并核对品牌规格', 
                          responsibilityStandard: '材料不符合要求时需及时上报', 
                          executor: '材料员', 
                          confirmer: '项目经理、监理' },
                        { name: '材料入库', 
                          executionStandard: '材料分类堆放、标识清晰', 
                          confirmationStandard: '检查材料是否完好无损', 
                          responsibilityStandard: '确保材料安全存储', 
                          executor: '材料员', 
                          confirmer: '仓库管理员' }
                    ]},
                    { name: '布管布线', order: false, tasks: [
                        { name: '强电布管', 
                          executionStandard: '管道横平竖直、间距均匀', 
                          confirmationStandard: '检查管道固定是否牢固', 
                          responsibilityStandard: '确保线路安全规范', 
                          executor: '电工组', 
                          confirmer: '项目经理' },
                        { name: '弱电布线', 
                          executionStandard: '线路走向合理、标识清晰', 
                          confirmationStandard: '测试线路通断', 
                          responsibilityStandard: '确保信号传输正常', 
                          executor: '弱电组', 
                          confirmer: '项目经理' },
                        { name: '给水管道', 
                          executionStandard: '管道密封、无渗漏', 
                          confirmationStandard: '进行压力测试', 
                          responsibilityStandard: '确保管道系统正常运行', 
                          executor: '水电工', 
                          confirmer: '项目经理' },
                        { name: '排水管道', 
                          executionStandard: '管道畅通、无堵塞', 
                          confirmationStandard: '进行通水测试', 
                          responsibilityStandard: '确保排水系统正常', 
                          executor: '水电工', 
                          confirmer: '项目经理' }
                    ]},
                    { name: '验收调试', order: true, tasks: [
                        { name: '通电测试', 
                          executionStandard: '各回路绝缘良好、接地可靠', 
                          confirmationStandard: '测试所有插座和开关', 
                          responsibilityStandard: '确保用电安全', 
                          executor: '电工组', 
                          confirmer: '项目经理、业主' },
                        { name: '通水测试', 
                          executionStandard: '水压正常、无渗漏', 
                          confirmationStandard: '检查所有水龙头和阀门', 
                          responsibilityStandard: '确保水路系统正常', 
                          executor: '水电工', 
                          confirmer: '项目经理' },
                        { name: '整体验收', 
                          executionStandard: '符合设计及规范要求', 
                          confirmationStandard: '逐项检查所有工程内容', 
                          responsibilityStandard: '确保工程质量合格', 
                          executor: '项目经理', 
                          confirmer: '业主、监理' }
                    ]}
                ]
            },
            {
                id: 2,
                name: '泥瓦施工阶段模板',
                type: '泥瓦工程',
                city: '杭州',
                status: 'active',
                stageCount: 4,
                taskCount: 10,
                updateTime: '2024-01-08 10:20',
                stages: [
                    { name: '基层处理', order: false, tasks: [
                        { name: '墙面找平', 
                          executionStandard: '平整度≤3mm/2m', 
                          confirmationStandard: '使用靠尺检查平整度', 
                          responsibilityStandard: '确保墙面平整达标', 
                          executor: '泥瓦工', 
                          confirmer: '项目经理' },
                        { name: '地面找平', 
                          executionStandard: '平整度≤5mm/2m', 
                          confirmationStandard: '使用水平仪检查平整度', 
                          responsibilityStandard: '确保地面平整达标', 
                          executor: '泥瓦工', 
                          confirmer: '项目经理' }
                    ]},
                    { name: '防水施工', order: true, tasks: [
                        { name: '防水涂刷', 
                          executionStandard: '涂刷均匀、无遗漏', 
                          confirmationStandard: '检查涂层厚度和均匀度', 
                          responsibilityStandard: '确保防水效果达标', 
                          executor: '泥瓦工', 
                          confirmer: '项目经理、监理' },
                        { name: '闭水试验', 
                          executionStandard: '48小时无渗漏', 
                          confirmationStandard: '检查水位是否下降', 
                          responsibilityStandard: '确保防水工程合格', 
                          executor: '泥瓦工', 
                          confirmer: '项目经理、业主' }
                    ]},
                    { name: '瓷砖铺贴', order: false, tasks: [
                        { name: '墙面瓷砖', 
                          executionStandard: '无空鼓、缝隙均匀', 
                          confirmationStandard: '使用空鼓锤检查', 
                          responsibilityStandard: '确保瓷砖铺贴质量', 
                          executor: '泥瓦工', 
                          confirmer: '项目经理' },
                        { name: '地面瓷砖', 
                          executionStandard: '无空鼓、坡度正确', 
                          confirmationStandard: '检查排水坡度和空鼓情况', 
                          responsibilityStandard: '确保地面瓷砖质量', 
                          executor: '泥瓦工', 
                          confirmer: '项目经理' },
                        { name: '阴阳角处理', 
                          executionStandard: '角度方正、边缘整齐', 
                          confirmationStandard: '使用直角尺检查', 
                          responsibilityStandard: '确保阴阳角处理美观', 
                          executor: '泥瓦工', 
                          confirmer: '项目经理' }
                    ]},
                    { name: '验收清洁', order: true, tasks: [
                        { name: '空鼓检测', 
                          executionStandard: '单块砖空鼓率≤5%', 
                          confirmationStandard: '全面检查所有瓷砖', 
                          responsibilityStandard: '确保瓷砖铺贴质量', 
                          executor: '泥瓦工', 
                          confirmer: '项目经理' },
                        { name: '平整度检测', 
                          executionStandard: '平整度≤2mm/2m', 
                          confirmationStandard: '使用靠尺检查', 
                          responsibilityStandard: '确保表面平整', 
                          executor: '泥瓦工', 
                          confirmer: '项目经理' },
                        { name: '清洁收尾', 
                          executionStandard: '表面洁净、无污染', 
                          confirmationStandard: '检查瓷砖表面清洁度', 
                          responsibilityStandard: '确保工地整洁', 
                          executor: '清洁工', 
                          confirmer: '项目经理' }
                    ]}
                ]
            },
            {
                id: 3,
                name: '木工施工阶段模板',
                type: '木工工程',
                city: '杭州',
                status: 'active',
                stageCount: 3,
                taskCount: 7,
                updateTime: '2024-01-05 16:45',
                stages: [
                    { name: '材料准备', order: true, tasks: [
                        { name: '材料验收', standard: '材料品牌、规格符合合同要求', executor: '木工', confirmer: '项目经理' },
                        { name: '图纸核对', standard: '尺寸、样式与设计一致', executor: '木工', confirmer: '项目经理' }
                    ]},
                    { name: '木工制作', order: false, tasks: [
                        { name: '吊顶制作', standard: '结构牢固、造型美观', executor: '木工', confirmer: '项目经理' },
                        { name: '柜体制作', standard: '尺寸准确、封边严密', executor: '木工', confirmer: '项目经理' },
                        { name: '门窗套制作', standard: '安装平整、缝隙均匀', executor: '木工', confirmer: '项目经理' }
                    ]},
                    { name: '安装验收', order: true, tasks: [
                        { name: '安装固定', standard: '牢固可靠、无松动', executor: '木工', confirmer: '项目经理' },
                        { name: '验收确认', standard: '符合设计及规范要求', executor: '项目经理', confirmer: '业主' }
                    ]}
                ]
            },
            {
                id: 4,
                name: '油漆施工阶段模板',
                type: '油漆工程',
                city: '杭州',
                status: 'active',
                stageCount: 2,
                taskCount: 5,
                updateTime: '2024-01-03 09:15',
                stages: [
                    { name: '基层处理', order: true, tasks: [
                        { name: '墙面打磨', standard: '表面平整、无砂痕', executor: '油漆工', confirmer: '项目经理' },
                        { name: '腻子批刮', standard: '均匀无气泡、干燥彻底', executor: '油漆工', confirmer: '项目经理' },
                        { name: '底漆涂刷', standard: '涂刷均匀、无遗漏', executor: '油漆工', confirmer: '项目经理' }
                    ]},
                    { name: '面漆施工', order: true, tasks: [
                        { name: '面漆涂刷', standard: '色泽均匀、无刷痕', executor: '油漆工', confirmer: '项目经理、业主' },
                        { name: '验收确认', standard: '表面光滑、颜色一致', executor: '项目经理', confirmer: '业主' }
                    ]}
                ]
            },
            {
                id: 5,
                name: '水电施工阶段模板（全国版）',
                type: '水电工程',
                city: '全国',
                status: 'active',
                stageCount: 3,
                taskCount: 8,
                updateTime: '2024-01-01 08:00',
                stages: [
                    { name: '材料进场', order: true, tasks: [
                        { name: '材料验收', standard: '材料品牌、规格、数量符合合同要求', executor: '材料员', confirmer: '项目经理、监理' },
                        { name: '材料入库', standard: '材料分类堆放、标识清晰', executor: '材料员', confirmer: '仓库管理员' }
                    ]},
                    { name: '布管布线', order: false, tasks: [
                        { name: '强电布管', standard: '管道横平竖直、间距均匀', executor: '电工组', confirmer: '项目经理' },
                        { name: '弱电布线', standard: '线路走向合理、标识清晰', executor: '弱电组', confirmer: '项目经理' },
                        { name: '给水管道', standard: '管道密封、无渗漏', executor: '水电工', confirmer: '项目经理' },
                        { name: '排水管道', standard: '管道畅通、无堵塞', executor: '水电工', confirmer: '项目经理' }
                    ]},
                    { name: '验收调试', order: true, tasks: [
                        { name: '通电测试', standard: '各回路绝缘良好、接地可靠', executor: '电工组', confirmer: '项目经理、业主' },
                        { name: '通水测试', standard: '水压正常、无渗漏', executor: '水电工', confirmer: '项目经理' },
                        { name: '整体验收', standard: '符合设计及规范要求', executor: '项目经理', confirmer: '业主、监理' }
                    ]}
                ]
            }
        ];

        let previewingTemplateId = null;
        let previewingTemplateType = null; // 'contract' or 'stage'

        function showTemplateModal() {
            selectedTemplateId = null;
            
            document.getElementById('filterCity').textContent = currentContractInfo.city;
            document.getElementById('filterType').textContent = currentContractInfo.category + ' - ' + currentContractInfo.type;
            
            const filteredTemplates = contractTemplates.filter(t => 
                t.status === 'active' && 
                (t.city === currentContractInfo.city || t.city === '全国') &&
                t.type === currentContractInfo.type
            );
            
            const listContainer = document.getElementById('templateSelectList');
            const emptyContainer = document.getElementById('templateEmpty');
            
            if (filteredTemplates.length === 0) {
                listContainer.style.display = 'none';
                emptyContainer.style.display = 'flex';
            } else {
                listContainer.style.display = 'flex';
                emptyContainer.style.display = 'none';
                
                listContainer.innerHTML = filteredTemplates.map(template => `
                    <div class="template-select-item" data-id="${template.id}" onclick="selectTemplate(${template.id})">
                        <div class="template-item-icon">📄</div>
                        <div class="template-item-content">
                            <div class="template-item-name">${template.name}</div>
                            <div class="template-item-meta">
                                <span class="template-item-tag city">${template.city}</span>
                                <span class="template-item-tag">${template.category}</span>
                                <span class="template-item-version">${template.version}</span>
                            </div>
                            <div class="template-item-desc">${template.desc}</div>
                        </div>
                        <div class="template-item-actions">
                            <button class="pc-btn pc-btn-default pc-btn-sm" onclick="event.stopPropagation(); previewTemplate(${template.id})"><i class="icon">👁️</i> 预览</button>
                            <button class="pc-btn pc-btn-primary pc-btn-sm" onclick="event.stopPropagation(); applyTemplate(${template.id})"><i class="icon">✓</i> 使用</button>
                        </div>
                    </div>
                `).join('');
            }
            
            document.getElementById('templateSelectModal').classList.add('show');
        }

        function closeTemplateModal() {
            document.getElementById('templateSelectModal').classList.remove('show');
        }

        function selectTemplate(id) {
            document.querySelectorAll('.template-select-item').forEach(item => {
                item.classList.remove('selected');
            });
            document.querySelector(`.template-select-item[data-id="${id}"]`).classList.add('selected');
            selectedTemplateId = id;
        }

        function previewTemplate(id) {
            // 先尝试从合同文本模板中查找
            const contractTemplate = contractTemplates.find(t => t.id === id);
            if (contractTemplate) {
                previewingTemplateId = id;
                previewingTemplateType = 'contract';
                document.getElementById('previewTemplateName').textContent = contractTemplate.name;
                document.getElementById('previewTemplateType').textContent = contractTemplate.type;
                document.getElementById('previewTemplateCity').textContent = contractTemplate.city;
                document.getElementById('previewTemplateUpdateTime').textContent = contractTemplate.updateTime;
                
                const stagesPreview = document.getElementById('templateStagesPreview');
                stagesPreview.innerHTML = `
                    <div class="template-content-preview">
                        <h4>合同文本内容</h4>
                        <div class="template-content">${contractTemplate.content}</div>
                    </div>
                `;
                
                document.getElementById('templatePreviewModal').classList.add('show');
                return;
            }
            
            // 再尝试从阶段任务模板中查找
            const stageTemplate = stageTemplates.find(t => t.id === id);
            if (stageTemplate) {
                previewingTemplateId = id;
                previewingTemplateType = 'stage';
                document.getElementById('previewTemplateName').textContent = stageTemplate.name;
                document.getElementById('previewTemplateType').textContent = stageTemplate.type;
                document.getElementById('previewTemplateCity').textContent = stageTemplate.city;
                document.getElementById('previewTemplateUpdateTime').textContent = stageTemplate.updateTime;
                
                const stagesPreview = document.getElementById('templateStagesPreview');
                stagesPreview.innerHTML = stageTemplate.stages.map((stage, stageIndex) => `
                    <div class="preview-stage-item">
                        <div class="preview-stage-header">
                            <span class="preview-stage-name">${stage.name}</span>
                            <span class="preview-stage-order">${stage.order ? '按序执行' : '并行执行'}</span>
                        </div>
                        <div class="preview-tasks-list">
                            ${stage.tasks.map((task, taskIndex) => `
                                <div class="preview-task-item">
                                    <span class="preview-task-name">${task.name}</span>
                                    <div class="preview-task-standards">
                                        <span class="preview-task-standard">执行标准：${task.executionStandard || task.standard || ''}</span>
                                        <span class="preview-task-standard">确认标准：${task.confirmationStandard || task.standard || ''}</span>
                                        <span class="preview-task-standard">担责标准：${task.responsibilityStandard || task.standard || ''}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('');
                
                document.getElementById('templatePreviewModal').classList.add('show');
            }
        }

        function closeTemplatePreviewModal() {
            document.getElementById('templatePreviewModal').classList.remove('show');
            previewingTemplateId = null;
        }

        function applyTemplateFromPreview() {
            if (previewingTemplateId) {
                if (previewingTemplateType === 'contract') {
                    applyTemplate(previewingTemplateId);
                } else if (previewingTemplateType === 'stage') {
                    applyStageTemplate(previewingTemplateId);
                }
                closeTemplatePreviewModal();
            }
        }

        function applyTemplate(id) {
            const template = contractTemplates.find(t => t.id === id);
            if (template) {
                if (confirm(`确定要使用"${template.name}"吗？\n此操作将覆盖当前合同正文内容。`)) {
                    document.getElementById('contractContent').innerHTML = template.content;
                    highlightChanges();
                    closeTemplateModal();
                    showToast(`已应用模板：${template.name}`);
                }
            }
        }

        function showStageTemplateModal() {
            document.getElementById('stageFilterCity').textContent = currentContractInfo.city;
            document.getElementById('stageFilterType').textContent = currentContractInfo.type;
            
            const filteredTemplates = stageTemplates.filter(t => 
                t.status === 'active' && 
                (t.city === currentContractInfo.city || t.city === '全国') &&
                t.type === currentContractInfo.type
            );
            
            const listContainer = document.getElementById('stageTemplateList');
            const emptyContainer = document.getElementById('stageTemplateEmpty');
            
            if (filteredTemplates.length === 0) {
                listContainer.style.display = 'none';
                emptyContainer.style.display = 'flex';
            } else {
                listContainer.style.display = 'flex';
                emptyContainer.style.display = 'none';
                
                listContainer.innerHTML = filteredTemplates.map(template => `
                    <div class="stage-template-item" data-id="${template.id}">
                        <div class="stage-template-header-row" onclick="toggleStageTemplateItem(this)">
                            <div class="stage-template-info">
                                <div class="stage-template-icon">📝</div>
                                <div>
                                    <div class="stage-template-name">${template.name}</div>
                                    <div class="stage-template-meta">
                                        <span>🏙️ ${template.city}</span>
                                        <span>📋 ${template.stageCount}个阶段</span>
                                        <span>📝 ${template.taskCount}个任务</span>
                                    </div>
                                </div>
                            </div>
                            <div class="stage-template-actions">
                                <button class="pc-btn pc-btn-primary pc-btn-sm" onclick="event.stopPropagation(); applyStageTemplate(${template.id})"><i class="icon">✓</i> 使用此模板</button>
                                <span style="color: var(--text-tertiary); margin-left: 8px; cursor: pointer;">▶</span>
                            </div>
                        </div>
                        <div class="stage-template-body-row">
                            <div class="stage-preview-list">
                                ${template.stages.map((stage, index) => `
                                    <div class="stage-preview-item">
                                        <div class="stage-preview-number">${index + 1}</div>
                                        <div class="stage-preview-content">
                                            <div class="stage-preview-name">
                                                ${stage.name}
                                                ${stage.order ? '<span class="stage-preview-order">按序执行</span>' : ''}
                                            </div>
                                            <div class="stage-preview-tasks">
                                                ${stage.tasks.map(task => `
                                                    <div class="stage-preview-task-item">
                                                        <span class="task-name">${task.name}</span>
                                                        <span class="task-meta">执行标准：${task.executionStandard || task.standard || ''}</span>
                                                        <span class="task-meta">确认标准：${task.confirmationStandard || task.standard || ''}</span>
                                                        <span class="task-meta">担责标准：${task.responsibilityStandard || task.standard || ''}</span>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            
            document.getElementById('stageTemplateModal').classList.add('show');
        }

        function closeStageTemplateModal() {
            document.getElementById('stageTemplateModal').classList.remove('show');
        }

        function toggleStageTemplateItem(headerRow) {
            const item = headerRow.parentElement;
            const arrow = headerRow.querySelector('.stage-template-actions span:last-child');
            item.classList.toggle('expanded');
            if (item.classList.contains('expanded')) {
                arrow.textContent = '▼';
            } else {
                arrow.textContent = '▶';
            }
        }

        function applyStageTemplate(id) {
            console.log('applyStageTemplate called with id:', id);
            const template = stageTemplates.find(t => t.id === id);
            if (template) {
                console.log('Found template:', template);
                if (confirm(`确定要使用"${template.name}"吗？\n此操作将添加模板中的阶段和任务。`)) {
                    const stageList = document.getElementById('stageList');
                    console.log('Stage list element:', stageList);
                    
                    // 清空现有阶段（保留已完成和进行中的阶段）
                    const existingStages = stageList.querySelectorAll('.stage-item');
                    console.log('Existing stages:', existingStages);
                    existingStages.forEach(stage => {
                        if (!stage.querySelector('.task-status-tag.completed') && !stage.querySelector('.task-status-tag.in-progress')) {
                            stage.remove();
                        }
                    });
                    
                    // 添加模板阶段
                    template.stages.forEach((stage, index) => {
                        const stageHtml = `
                            <div class="stage-item stage-added">
                                <div class="stage-header" onclick="toggleStage(this)">
                                    <div class="stage-info">
                                        <span class="stage-name">${stage.name}</span>
                                        ${stage.order ? '<span class="stage-sequential">按序执行</span>' : ''}
                                        <span class="change-badge added">新增</span>
                                    </div>
                                    <div class="stage-actions">
                                        <button class="pc-btn pc-btn-text pc-btn-sm" onclick="event.stopPropagation(); editStage(${100 + index})">编辑</button>
                                        <button class="pc-btn pc-btn-text pc-btn-sm" onclick="event.stopPropagation(); deleteStage(${100 + index})">删除</button>
                                        <span style="color: var(--text-tertiary);">▼</span>
                                    </div>
                                </div>
                                <div class="stage-body" style="display: none;">
                                    ${stage.tasks.map((task, taskIndex) => `
                                        <div class="task-item task-added" data-task-id="${100 + index}_${taskIndex}">
                                            <div class="task-info">
                                                <span class="task-name">${task.name}</span>
                                                <span class="task-meta">执行标准：${task.executionStandard || task.standard || '-'} | 确认标准：${task.confirmationStandard || task.standard || '-'} | 担责标准：${task.responsibilityStandard || task.standard || '-'} | 执行人：${task.executor} | 确认人：${task.confirmer || task.confirmers || '待分配'}</span>
                                                <span class="change-badge added">新增</span>
                                            </div>
                                            <div class="flex gap-8">
                                                <button class="pc-btn pc-btn-text pc-btn-sm" onclick="editTask(${100 + index}, ${taskIndex})">编辑</button>
                                                <button class="pc-btn pc-btn-text pc-btn-sm" onclick="deleteTask(${100 + index}, ${taskIndex})">删除</button>
                                            </div>
                                        </div>
                                    `).join('')}
                                    <button class="pc-btn pc-btn-default pc-btn-sm mt-8" onclick="addTask(${100 + index})"><i class="icon">+</i> 添加任务</button>
                                </div>
                            </div>
                        `;
                        
                        const addBtn = stageList.querySelector('.add-stage-btn');
                        console.log('Add button element:', addBtn);
                        if (addBtn) {
                            addBtn.insertAdjacentHTML('beforebegin', stageHtml);
                        } else {
                            console.error('Add button not found');
                            stageList.insertAdjacentHTML('beforeend', stageHtml);
                        }
                    });
                    
                    closeStageTemplateModal();
                    showToast(`已应用阶段任务模板：${template.name}`);
                }
            } else {
                console.log('Template not found with id:', id);
            }
        }

        function highlightChanges() {
            // 高亮变更内容
            const changeSections = document.querySelectorAll('[style*="color: var(--error-color)"]');
            changeSections.forEach(section => {
                section.style.backgroundColor = '#FFF7E6';
                section.style.padding = '8px 12px';
                section.style.borderRadius = '4px';
                section.style.margin = '8px 0';
            });
        }

        function clearContent() {
            if (confirm('确定要清空合同正文内容吗？')) {
                document.getElementById('contractContent').innerHTML = '';
            }
        }

        function viewOriginal() {
            showToast('查看原合同');
        }

        function viewHistory() {
            showToast('查看变更记录');
        }

        function cancelChange() {
            if (confirm('确定要取消变更吗？\n\n取消后将返回合同详情页面，变更内容将不会保存。')) {
                window.location.href = 'pc-contract-detail.html?id=1&status=signed';
            }
        }

        function submitChange() {
            const reason = document.getElementById('changeReason').value.trim();
            if (!reason) {
                showToast('请填写变更原因');
                return;
            }
            
            if (confirm('确定要提交变更申请吗？\n\n提交后将发送给合同另一方确认。')) {
                const now = new Date();
                const timeStr = now.getFullYear() + '-' + 
                    String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                    String(now.getDate()).padStart(2, '0') + ' ' + 
                    String(now.getHours()).padStart(2, '0') + ':' + 
                    String(now.getMinutes()).padStart(2, '0');
                document.getElementById('submitTime').textContent = timeStr;
                
                document.getElementById('waitingPage').classList.add('show');
            }
        }

        function backToDetail() {
            window.location.href = 'pc-contract-detail.html?id=1&status=changing';
        }

        function togglePageNav() {
            const wrapper = document.getElementById('pageNavWrapper');
            const nav = document.getElementById('pageNav');
            const toggle = wrapper.querySelector('.pc-page-nav-toggle');
            nav.classList.toggle('collapsed');
            wrapper.classList.toggle('collapsed');
            if (nav.classList.contains('collapsed')) {
                toggle.textContent = '▶';
            } else {
                toggle.textContent = '◀';
            }
        }

        function toggleUserDropdown() {
            document.getElementById('userDropdownMenu').classList.toggle('show');
        }

        function logout() {
            if (confirm('确定要退出登录吗？')) {
                window.location.href = 'pc-login.html';
            }
        }

        function goToProfile() {
            window.location.href = 'pc-profile.html';
        }

        function goToAccountSettings() {
            window.location.href = 'pc-account-settings.html';
        }

        function showToast(message) {
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.75);
                color: #fff;
                padding: 10px 20px;
                border-radius: 4px;
                font-size: 14px;
                z-index: 10000;
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        }

        function triggerAttachmentUpload() {
            document.getElementById('attachmentInput').click();
        }

        function handleAttachmentUpload(files) {
            if (!files || files.length === 0) return;
            
            const maxSize = 20 * 1024 * 1024;
            
            for (let file of files) {
                if (file.size > maxSize) {
                    showToast(`文件"${file.name}"超过20MB限制`);
                    continue;
                }
                
                const fileExt = file.name.split('.').pop().toLowerCase();
                const extMap = {
                    'jpg': 'image', 'jpeg': 'image', 'png': 'image', 'gif': 'image', 'webp': 'image',
                    'pdf': 'pdf',
                    'doc': 'word', 'docx': 'word',
                    'xls': 'excel', 'xlsx': 'excel',
                    'ppt': 'other', 'pptx': 'other'
                };
                
                const attachment = {
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    size: file.size,
                    type: extMap[fileExt] || 'other',
                    ext: fileExt
                };
                
                contractAttachments.push(attachment);
            }
            
            renderAttachmentList();
            document.getElementById('attachmentInput').value = '';
            showToast(`已添加 ${files.length} 个附件`);
        }

        function renderAttachmentList() {
            const container = document.getElementById('attachmentList');
            
            if (contractAttachments.length === 0) {
                container.innerHTML = '';
                return;
            }
            
            const iconMap = {
                'image': '🖼️',
                'pdf': '📄',
                'word': '📝',
                'excel': '📊',
                'other': '📁'
            };
            
            container.innerHTML = contractAttachments.map(att => `
                <div class="attachment-item" data-id="${att.id}">
                    <div class="file-icon ${att.type}">${iconMap[att.type]}</div>
                    <div class="file-info">
                        <div class="file-name">${att.name}</div>
                        <div class="file-meta">${formatFileSize(att.size)} · ${att.ext.toUpperCase()}</div>
                    </div>
                    <div class="file-actions">
                        <button class="btn-preview" onclick="previewAttachment('${att.id}')">预览</button>
                        <button class="btn-delete" onclick="deleteAttachment('${att.id}')">删除</button>
                    </div>
                </div>
            `).join('');
        }

        function formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        }

        function previewAttachment(id) {
            const att = contractAttachments.find(a => a.id === id);
            if (att) {
                showToast(`预览文件：${att.name}`);
            }
        }

        function deleteAttachment(id) {
            if (confirm('确定要删除此附件吗？')) {
                contractAttachments = contractAttachments.filter(a => a.id !== id);
                renderAttachmentList();
                showToast('附件已删除');
            }
        }

        function initQuickNav() {
            const navItems = document.querySelectorAll('.quick-nav-item');
            
            navItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const sectionId = this.getAttribute('data-section');
                    const section = document.getElementById(sectionId);
                    
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        
                        navItems.forEach(nav => nav.classList.remove('active'));
                        this.classList.add('active');
                    }
                });
            });
            
            const sections = ['basicInfo', 'contractContentSection', 'stageSection', 'attachmentSection'];
            
            window.addEventListener('scroll', function() {
                let currentSection = 'basicInfo';
                
                sections.forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        if (rect.top <= 150) {
                            currentSection = sectionId;
                        }
                    }
                });
                
                navItems.forEach(item => {
                    if (item.getAttribute('data-section') === currentSection) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            });
        }

        document.addEventListener('click', function(e) {
            const dropdown = document.querySelector('.pc-user-dropdown');
            const menu = document.getElementById('userDropdownMenu');
            if (dropdown && menu && !dropdown.contains(e.target)) {
                menu.classList.remove('show');
            }
            
            const executorSelect = document.getElementById('executorSelect');
            const executorDropdown = document.getElementById('executorDropdown');
            if (executorSelect && executorDropdown && !executorSelect.contains(e.target)) {
                executorDropdown.classList.remove('show');
            }
            
            const confirmerSelect = document.getElementById('confirmerSelect');
            const confirmerDropdown = document.getElementById('confirmerDropdown');
            if (confirmerSelect && confirmerDropdown && !confirmerSelect.contains(e.target)) {
                confirmerDropdown.classList.remove('show');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeEditTaskModal();
                closeAddStageModal();
            }
        });

        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role');
        const contractId = urlParams.get('contractId');

        if (role === 'operator') {
            document.querySelector('.pc-role-switcher .pc-role-btn:first-child').click();
        }

        initQuickNav();
        renderAttachmentList();
    