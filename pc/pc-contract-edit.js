
        let currentPcRole = 'initiator';
        let contractAttachments = [
            { id: '1', name: '合同附件-设计图纸.pdf', size: 2048000, type: 'pdf', ext: 'pdf' },
            { id: '2', name: '施工现场照片.jpg', size: 1536000, type: 'image', ext: 'jpg' },
            { id: '3', name: '工程量清单.xlsx', size: 512000, type: 'excel', ext: 'xlsx' }
        ];

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
                content: `<h3 style="text-align: center; margin-bottom: 20px;">水电分包合同</h3>
<p><strong>甲方：</strong>{{party_a}}</p>
<p><strong>乙方：</strong>{{party_b}}</p>
<br>
<p>根据《中华人民共和国合同法》及相关法律法规，甲乙双方本着平等、自愿、公平、诚实信用的原则，就水电工程分包事宜，经协商一致，签订本合同。</p>
<br>
<h4>第一条 工程概况</h4>
<p>1.1 工程名称：{{project_name}}</p>
<p>1.2 工程地点：{{project_location}}</p>
<p>1.3 承包范围：强电、弱电、给排水等水电安装工程</p>
<br>
<h4>第二条 合同价款</h4>
<p>2.1 本合同总价款为人民币{{amount}}元整</p>
<p>2.2 合同价款为固定总价，不因市场价格波动而调整</p>
<br>
<h4>第三条 工期</h4>
<p>3.1 工期总日历天数：{{duration}}天</p>
<p>3.2 开工日期：以甲方书面通知为准</p>
<p>3.3 竣工日期：开工日期后{{duration}}日内</p>`
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
                content: `<h3 style="text-align: center; margin-bottom: 20px;">泥瓦分包合同</h3>
<p><strong>甲方：</strong>{{party_a}}</p>
<p><strong>乙方：</strong>{{party_b}}</p>
<br>
<p>根据《中华人民共和国合同法》及相关法律法规，甲乙双方就泥瓦工程分包事宜签订本合同。</p>`
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
                content: `<h3 style="text-align: center; margin-bottom: 20px;">木工分包合同</h3>
<p><strong>甲方：</strong>{{party_a}}</p>
<p><strong>乙方：</strong>{{party_b}}</p>`
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
                content: `<h3 style="text-align: center; margin-bottom: 20px;">油漆分包合同</h3>
<p><strong>甲方：</strong>{{party_a}}</p>
<p><strong>乙方：</strong>{{party_b}}</p>`
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
<p><strong>甲方：</strong>{{party_a}}</p>
<p><strong>乙方：</strong>{{party_b}}</p>`
            }
        ];

        let currentContractInfo = {
            city: '杭州',
            type: '水电工程',
            category: '分包合同'
        };

        let selectedTemplateId = null;

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
                        { name: '材料验收', 
                          executionStandard: '材料品牌、规格符合合同要求', 
                          confirmationStandard: '核对材料清单和质量', 
                          responsibilityStandard: '确保材料符合要求', 
                          executor: '木工', 
                          confirmer: '项目经理' },
                        { name: '图纸核对', 
                          executionStandard: '尺寸、样式与设计一致', 
                          confirmationStandard: '仔细核对设计图纸', 
                          responsibilityStandard: '确保施工符合设计要求', 
                          executor: '木工', 
                          confirmer: '项目经理' }
                    ]},
                    { name: '木工制作', order: false, tasks: [
                        { name: '吊顶制作', 
                          executionStandard: '结构牢固、造型美观', 
                          confirmationStandard: '检查结构稳定性', 
                          responsibilityStandard: '确保吊顶安全可靠', 
                          executor: '木工', 
                          confirmer: '项目经理' },
                        { name: '柜体制作', 
                          executionStandard: '尺寸准确、封边严密', 
                          confirmationStandard: '检查尺寸和封边质量', 
                          responsibilityStandard: '确保柜体质量合格', 
                          executor: '木工', 
                          confirmer: '项目经理' },
                        { name: '门窗套制作', 
                          executionStandard: '安装平整、缝隙均匀', 
                          confirmationStandard: '检查安装质量', 
                          responsibilityStandard: '确保门窗套美观牢固', 
                          executor: '木工', 
                          confirmer: '项目经理' }
                    ]},
                    { name: '安装验收', order: true, tasks: [
                        { name: '安装固定', 
                          executionStandard: '牢固可靠、无松动', 
                          confirmationStandard: '检查固定情况', 
                          responsibilityStandard: '确保安装安全', 
                          executor: '木工', 
                          confirmer: '项目经理' },
                        { name: '验收确认', 
                          executionStandard: '符合设计及规范要求', 
                          confirmationStandard: '全面检查工程质量', 
                          responsibilityStandard: '确保工程质量合格', 
                          executor: '项目经理', 
                          confirmer: '业主' }
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
                        { name: '墙面打磨', 
                          executionStandard: '表面平整、无砂痕', 
                          confirmationStandard: '检查表面平整度', 
                          responsibilityStandard: '确保基层处理合格', 
                          executor: '油漆工', 
                          confirmer: '项目经理' },
                        { name: '腻子批刮', 
                          executionStandard: '均匀无气泡、干燥彻底', 
                          confirmationStandard: '检查腻子质量', 
                          responsibilityStandard: '确保腻子层质量', 
                          executor: '油漆工', 
                          confirmer: '项目经理' },
                        { name: '底漆涂刷', 
                          executionStandard: '涂刷均匀、无遗漏', 
                          confirmationStandard: '检查底漆覆盖情况', 
                          responsibilityStandard: '确保底漆涂刷质量', 
                          executor: '油漆工', 
                          confirmer: '项目经理' }
                    ]},
                    { name: '面漆施工', order: true, tasks: [
                        { name: '面漆涂刷', 
                          executionStandard: '色泽均匀、无刷痕', 
                          confirmationStandard: '检查面漆质量', 
                          responsibilityStandard: '确保面漆涂刷质量', 
                          executor: '油漆工', 
                          confirmer: '项目经理、业主' },
                        { name: '验收确认', 
                          executionStandard: '表面光滑、颜色一致', 
                          confirmationStandard: '全面检查工程质量', 
                          responsibilityStandard: '确保工程质量合格', 
                          executor: '项目经理', 
                          confirmer: '业主' }
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
            }
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
            const stageList = document.getElementById('stageList');
            const stageCount = stageList.children.length + 1;
            
            const stageNames = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
            const stageNameText = stageNames[stageCount - 1] || stageCount;
            
            const newStage = document.createElement('div');
            newStage.className = 'stage-item';
            newStage.innerHTML = `
                <div class="stage-header" onclick="toggleStage(this)">
                    <div class="stage-info">
                        <span class="stage-name">阶段${stageNameText}：新阶段</span>
                    </div>
                    <div class="stage-actions">
                        <button class="pc-btn pc-btn-text pc-btn-sm" onclick="event.stopPropagation(); editStage(${stageCount})">编辑</button>
                        <button class="pc-btn pc-btn-text pc-btn-sm" onclick="event.stopPropagation(); deleteStage(${stageCount})">删除</button>
                        <span style="color: var(--text-tertiary);">▼</span>
                    </div>
                </div>
                <div class="stage-body">
                    <button class="pc-btn pc-btn-default pc-btn-sm mt-8" onclick="addTask(${stageCount})">+ 添加任务</button>
                </div>
            `;
            
            stageList.appendChild(newStage);
            showToast(`已添加阶段${stageCount}`);
        }

        function editStage(id) {
            const stageList = document.getElementById('stageList');
            const stageItem = stageList.children[id - 1];
            if (!stageItem) return;
            
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
            
            const stageList = document.getElementById('stageList');
            const stageItem = stageList.children[id - 1];
            if (!stageItem) return;
            
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
            if (confirm('确定要删除此阶段吗？删除后相关任务也会被删除。')) {
                const stageList = document.getElementById('stageList');
                const stageItem = stageList.children[id - 1];
                if (stageItem) {
                    stageItem.remove();
                    showToast('已删除阶段：' + id);
                    // 更新阶段序号
                    updateStageNumbers();
                }
            }
        }

        function updateStageNumbers() {
            const stageList = document.getElementById('stageList');
            const stageItems = stageList.children;
            
            for (let i = 0; i < stageItems.length; i++) {
                const stageItem = stageItems[i];
                const stageName = stageItem.querySelector('.stage-name');
                const editBtn = stageItem.querySelector('button:nth-child(1)');
                const deleteBtn = stageItem.querySelector('button:nth-child(2)');
                const addTaskBtn = stageItem.querySelector('.pc-btn-default');
                
                if (stageName) {
                    const currentName = stageName.textContent;
                    const newName = currentName.replace(/阶段\d+：/, `阶段${i + 1}：`);
                    stageName.textContent = newName;
                }
                
                if (editBtn) {
                    editBtn.onclick = function(e) {
                        e.stopPropagation();
                        editStage(i + 1);
                    };
                }
                
                if (deleteBtn) {
                    deleteBtn.onclick = function(e) {
                        e.stopPropagation();
                        deleteStage(i + 1);
                    };
                }
                
                if (addTaskBtn) {
                    addTaskBtn.onclick = function() {
                        addTask(i + 1);
                    };
                }
            }
        }

        function addTask(stageId) {
            const stageList = document.getElementById('stageList');
            const stageItem = stageList.children[stageId - 1];
            if (!stageItem) return;
            
            const stageBody = stageItem.querySelector('.stage-body');
            if (!stageBody) return;
            
            const taskCount = stageBody.querySelectorAll('.task-item').length + 1;
            
            const newTask = document.createElement('div');
            newTask.className = 'task-item';
            newTask.innerHTML = `
                <div class="task-info">
                    <span class="task-name">任务${taskCount}</span>
                    <span class="task-meta">执行标准：- | 确认标准：- | 担责标准：- | 执行人：待分配 | 确认人：待分配</span>
                </div>
                <div class="flex gap-8">
                    <button class="pc-btn pc-btn-text pc-btn-sm" onclick="editTask(${stageId}, ${taskCount - 1})">编辑</button>
                    <button class="pc-btn pc-btn-text pc-btn-sm" onclick="deleteTask(${stageId}, ${taskCount - 1})">删除</button>
                </div>
            `;
            
            const addTaskBtn = stageBody.querySelector('.pc-btn-default');
            stageBody.insertBefore(newTask, addTaskBtn);
            showToast(`已为阶段${stageId}添加任务`);
        }

        function editTask(stageId, taskIndex) {
            const stageList = document.getElementById('stageList');
            const stageItem = stageList.children[stageId - 1];
            if (!stageItem) return;
            
            const stageBody = stageItem.querySelector('.stage-body');
            if (!stageBody) return;
            
            const taskItem = stageBody.querySelectorAll('.task-item')[taskIndex];
            if (!taskItem) return;
            
            const taskName = taskItem.querySelector('.task-name').textContent;
            const taskMeta = taskItem.querySelector('.task-meta').textContent;
            
            let executionStandard = '';
            let confirmationStandard = '';
            let responsibilityStandard = '';
            let executor = '';
            let confirmer = '';
            
            const executionStandardMatch = taskMeta.match(/执行标准：(.*?) \|/);
            if (executionStandardMatch) {
                executionStandard = executionStandardMatch[1] || '';
            }
            
            const confirmationStandardMatch = taskMeta.match(/确认标准：(.*?) \|/);
            if (confirmationStandardMatch) {
                confirmationStandard = confirmationStandardMatch[1] || '';
            }
            
            const responsibilityStandardMatch = taskMeta.match(/担责标准：(.*?) \|/);
            if (responsibilityStandardMatch) {
                responsibilityStandard = responsibilityStandardMatch[1] || '';
            }
            
            const executorMatch = taskMeta.match(/执行人：(.*?) \|/);
            if (executorMatch) {
                executor = executorMatch[1] || '';
            }
            
            const confirmerMatch = taskMeta.match(/确认人：(.*)/);
            if (confirmerMatch) {
                confirmer = confirmerMatch[1] || '';
            }
            
            document.getElementById('editTaskStageId').value = stageId;
            document.getElementById('editTaskIndex').value = taskIndex;
            document.getElementById('editTaskName').value = taskName;
            document.getElementById('editTaskExecutionStandard').value = executionStandard;
            document.getElementById('editTaskConfirmationStandard').value = confirmationStandard;
            document.getElementById('editTaskResponsibilityStandard').value = responsibilityStandard;
            document.getElementById('editTaskExecutor').value = executor;
            document.getElementById('editTaskConfirmer').value = confirmer;
            
            // 重置执行人选择
            document.getElementById('editTaskExecutor').value = '';
            document.getElementById('selectedExecutor').innerHTML = '';
            
            // 重置确认人选择
            document.getElementById('editTaskConfirmer').value = '';
            document.getElementById('selectedConfirmers').innerHTML = '';
            
            // 设置执行人选择
            if (executor && executor !== '待分配') {
                document.getElementById('editTaskExecutor').value = executor;
                // 尝试从项目人员中找到匹配的人员
                const userText = executor;
                document.getElementById('selectedExecutor').innerHTML = `
                    <div class="selected-user-tag">
                        <span class="user-avatar">👤</span>
                        <span>${userText}</span>
                        <span class="remove-user" onclick="removeUser('executor')">×</span>
                    </div>
                `;
            }
            
            // 设置确认人选择
            if (confirmer && confirmer !== '待分配') {
                const confirmers = confirmer.split('、');
                const selectedConfirmers = document.getElementById('selectedConfirmers');
                confirmers.forEach(c => {
                    selectedConfirmers.insertAdjacentHTML('beforeend', `
                        <div class="selected-user-tag">
                            <span class="user-avatar">👤</span>
                            <span>${c}</span>
                            <span class="remove-user" onclick="removeUser('confirmer', this)">×</span>
                        </div>
                    `);
                });
            }
            
            document.getElementById('taskEditModal').classList.add('show');
        }

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
            document.getElementById('executorSearch').addEventListener('click', function() {
                searchUsers('executor');
            });
            
            document.getElementById('confirmerSearch').addEventListener('click', function() {
                searchUsers('confirmer');
            });
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
                document.getElementById('executorDropdown').style.display = 'none';
                document.getElementById('confirmerDropdown').style.display = 'none';
            }
        });

        function closeTaskEditModal() {
            document.getElementById('taskEditModal').classList.remove('show');
        }

        function saveTaskEdit() {
            const stageId = document.getElementById('editTaskStageId').value;
            const taskIndex = document.getElementById('editTaskIndex').value;
            const name = document.getElementById('editTaskName').value.trim();
            const executionStandard = document.getElementById('editTaskExecutionStandard').value.trim();
            const confirmationStandard = document.getElementById('editTaskConfirmationStandard').value.trim();
            const responsibilityStandard = document.getElementById('editTaskResponsibilityStandard').value.trim();
            const executor = document.getElementById('editTaskExecutor').value;
            
            // 获取选中的确认人
            const checkedConfirmers = document.querySelectorAll('.confirmer-checkbox:checked');
            let confirmer = '待分配';
            if (checkedConfirmers.length > 0) {
                const confirmersArray = Array.from(checkedConfirmers).map(checkbox => checkbox.value);
                confirmer = confirmersArray.join('、');
            }
            
            if (!name) {
                showToast('请输入任务名称');
                return;
            }
            
            if (!executionStandard) {
                showToast('请输入执行标准');
                return;
            }
            
            if (!confirmationStandard) {
                showToast('请输入确认标准');
                return;
            }
            
            if (!responsibilityStandard) {
                showToast('请输入担责标准');
                return;
            }
            
            // 执行人和确认人为非必填项
            if (!executor) {
                executor = '待分配';
            }
            
            const stageList = document.getElementById('stageList');
            const stageItem = stageList.children[stageId - 1];
            if (!stageItem) return;
            
            const stageBody = stageItem.querySelector('.stage-body');
            if (!stageBody) return;
            
            const taskItem = stageBody.querySelectorAll('.task-item')[taskIndex];
            if (!taskItem) return;
            
            taskItem.querySelector('.task-name').textContent = name;
            taskItem.querySelector('.task-meta').textContent = `执行标准：${executionStandard} | 确认标准：${confirmationStandard} | 担责标准：${responsibilityStandard} | 执行人：${executor} | 确认人：${confirmer}`;
            
            closeTaskEditModal();
            showToast('任务信息已保存');
        }

        function deleteTask(stageId, taskIndex) {
            if (confirm('确定要删除此任务吗？')) {
                const stageList = document.getElementById('stageList');
                const stageItem = stageList.children[stageId - 1];
                if (!stageItem) return;
                
                const stageBody = stageItem.querySelector('.stage-body');
                if (!stageBody) return;
                
                const taskItem = stageBody.querySelectorAll('.task-item')[taskIndex];
                if (taskItem) {
                    taskItem.remove();
                    showToast('已删除任务');
                }
            }
        }

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
                            <button class="pc-btn pc-btn-default pc-btn-sm" onclick="event.stopPropagation(); previewTemplate(${template.id})">预览</button>
                            <button class="pc-btn pc-btn-primary pc-btn-sm" onclick="event.stopPropagation(); applyTemplate(${template.id})">使用</button>
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

        let previewingTemplateId = null;
        let previewingTemplateType = null; // 'contract' or 'stage'

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
                                        <span class="preview-task-standard">执行标准：${task.executionStandard}</span>
                                        <span class="preview-task-standard">确认标准：${task.confirmationStandard}</span>
                                        <span class="preview-task-standard">担责标准：${task.responsibilityStandard}</span>
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
                    document.getElementById('contractContentEditor').innerHTML = template.content;
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
                                <button class="pc-btn pc-btn-primary pc-btn-sm" onclick="event.stopPropagation(); applyStageTemplate(${template.id})">使用此模板</button>
                                <span style="color: var(--text-tertiary); margin-left: 8px;">▶</span>
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
                                                        <span class="task-meta">执行标准：${task.executionStandard}</span>
                                                        <span class="task-meta">确认标准：${task.confirmationStandard}</span>
                                                        <span class="task-meta">担责标准：${task.responsibilityStandard}</span>
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
            const template = stageTemplates.find(t => t.id === id);
            if (template) {
                if (confirm(`确定要使用"${template.name}"吗？\n此操作将覆盖当前阶段任务设置。`)) {
                    renderStageTemplate(template);
                    closeStageTemplateModal();
                    showToast(`已应用阶段任务模板：${template.name}`);
                }
            }
        }

        function renderStageTemplate(template) {
            const container = document.getElementById('stageList');
            container.innerHTML = '';
            
            template.stages.forEach((stage, index) => {
                const stageHtml = createStageItemHtml(index + 1, stage);
                container.insertAdjacentHTML('beforeend', stageHtml);
            });
        }

        function createStageItemHtml(stageIndex, stage) {
            const tasksHtml = stage.tasks.map((task, taskIndex) => `
                <div class="task-item">
                    <div class="task-info">
                        <span class="task-name">${task.name}</span>
                        <span class="task-meta">执行标准：${task.executionStandard} | 确认标准：${task.confirmationStandard} | 担责标准：${task.responsibilityStandard} | 执行人：${task.executor} | 确认人：${task.confirmer}</span>
                    </div>
                    <div class="flex gap-8">
                        <button class="pc-btn pc-btn-text pc-btn-sm" onclick="editTask(${stageIndex}, ${taskIndex})">编辑</button>
                        <button class="pc-btn pc-btn-text pc-btn-sm" onclick="deleteTask(${stageIndex}, ${taskIndex})">删除</button>
                    </div>
                </div>
            `).join('');
            
            const stageNames = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
            const stageNameText = stageNames[stageIndex - 1] || stageIndex;
            
            return `
                <div class="stage-item">
                    <div class="stage-header" onclick="toggleStage(this)">
                        <div class="stage-info">
                            <span class="stage-name">阶段${stageNameText}：${stage.name}</span>
                            ${stage.order ? '<span class="stage-sequential">按序执行</span>' : ''}
                        </div>
                        <div class="stage-actions">
                            <button class="pc-btn pc-btn-text pc-btn-sm" onclick="event.stopPropagation(); editStage(${stageIndex})">编辑</button>
                            <button class="pc-btn pc-btn-text pc-btn-sm" onclick="event.stopPropagation(); deleteStage(${stageIndex})">删除</button>
                            <span style="color: var(--text-tertiary);">▼</span>
                        </div>
                    </div>
                    <div class="stage-body">
                        ${tasksHtml}
                        <button class="pc-btn pc-btn-default pc-btn-sm mt-8" onclick="addTask(${stageIndex})">+ 添加任务</button>
                    </div>
                </div>
            `;
        }

        function clearContent() {
            if (confirm('确定要清空合同正文内容吗？')) {
                document.getElementById('contractContentEditor').innerHTML = '';
            }
        }

        // 保存合同功能
        function saveContract() {
            // 收集合同数据
            const contractData = {
                contractName: document.getElementById('contractName').value,
                contractAmount: document.querySelector('input[placeholder="请输入合同金额"]').value,
                contractContent: document.getElementById('contractContentEditor').innerHTML,
                stages: [],
                attachments: contractAttachments,
                savedAt: new Date().toISOString()
            };
            
            // 收集阶段和任务数据
            const stageItems = document.querySelectorAll('.stage-item');
            stageItems.forEach((stageItem, index) => {
                const stageName = stageItem.querySelector('.stage-name').textContent;
                const isSequential = stageItem.querySelector('.stage-sequential') !== null;
                
                const tasks = [];
                const taskItems = stageItem.querySelectorAll('.task-item');
                taskItems.forEach(taskItem => {
                    const taskName = taskItem.querySelector('.task-name').textContent;
                    const taskMeta = taskItem.querySelector('.task-meta').textContent;
                    
                    tasks.push({
                        name: taskName,
                        meta: taskMeta
                    });
                });
                
                contractData.stages.push({
                    name: stageName,
                    isSequential: isSequential,
                    tasks: tasks
                });
            });
            
            // 保存到localStorage
            try {
                localStorage.setItem('contractEditData', JSON.stringify(contractData));
                updateAutoSaveStatus('saved');
                showToast('合同已保存');
                return true;
            } catch (error) {
                console.error('保存失败:', error);
                showToast('保存失败，请重试');
                return false;
            }
        }

        // 取消编辑功能
        function cancelEdit() {
            if (confirm('确定要取消编辑吗？\n\n取消后将返回合同列表页面，编辑内容将不会保存。')) {
                // 清除自动保存的数据
                localStorage.removeItem('contractEditData');
                window.location.href = 'pc-contract-list.html';
            }
        }

        // 预览合同功能
        function previewContract() {
            // 创建预览窗口
            const previewWindow = window.open('', '_blank', 'width=1200,height=800');
            if (!previewWindow) {
                showToast('请允许弹出窗口以预览合同');
                return;
            }
            
            // 收集合同数据
            const contractData = {
                contractName: document.getElementById('contractName').value,
                contractAmount: document.querySelector('input[placeholder="请输入合同金额"]').value,
                contractContent: document.getElementById('contractContentEditor').innerHTML,
                stages: []
            };
            
            // 收集阶段和任务数据
            const stageItems = document.querySelectorAll('.stage-item');
            stageItems.forEach((stageItem, index) => {
                const stageName = stageItem.querySelector('.stage-name').textContent;
                const isSequential = stageItem.querySelector('.stage-sequential') !== null;
                
                const tasks = [];
                const taskItems = stageItem.querySelectorAll('.task-item');
                taskItems.forEach(taskItem => {
                    const taskName = taskItem.querySelector('.task-name').textContent;
                    const taskMeta = taskItem.querySelector('.task-meta').textContent;
                    
                    tasks.push({
                        name: taskName,
                        meta: taskMeta
                    });
                });
                
                contractData.stages.push({
                    name: stageName,
                    isSequential: isSequential,
                    tasks: tasks
                });
            });
            
            // 生成预览HTML
            const previewHTML = `
                <!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>合同预览</title>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto; }
                        h1 { text-align: center; color: #1890ff; }
                        .info { background: #f5f5f5; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
                        .info-item { margin: 8px 0; }
                        .info-label { font-weight: bold; margin-right: 10px; }
                        .section { margin: 20px 0; padding: 20px; border: 1px solid #e8e8e8; border-radius: 4px; }
                        .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e8e8e8; }
                        .stage { margin: 15px 0; padding: 15px; background: #fafafa; border-radius: 4px; }
                        .stage-name { font-weight: bold; margin-bottom: 10px; }
                        .task { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #1890ff; }
                        .task-meta { font-size: 12px; color: #8c8c8c; margin-top: 5px; }
                    </style>
                </head>
                <body>
                    <h1>${contractData.contractName || '合同预览'}</h1>
                    <div class="info">
                        <div class="info-item"><span class="info-label">合同金额：</span>${contractData.contractAmount || '未填写'}元</div>
                    </div>
                    <div class="section">
                        <div class="section-title">合同正文</div>
                        ${contractData.contractContent}
                    </div>
                    <div class="section">
                        <div class="section-title">阶段任务</div>
                        ${contractData.stages.map(stage => `
                            <div class="stage">
                                <div class="stage-name">${stage.name}${stage.isSequential ? ' <span style="color: #8c8c8c; font-size: 12px;">(按序执行)</span>' : ''}</div>
                                ${stage.tasks.map(task => `
                                    <div class="task">
                                        <div><strong>${task.name}</strong></div>
                                        <div class="task-meta">${task.meta}</div>
                                    </div>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                </body>
                </html>
            `;
            
            previewWindow.document.write(previewHTML);
            previewWindow.document.close();
        }

        // 更新自动保存状态
        function updateAutoSaveStatus(status) {
            const autoSaveStatus = document.getElementById('autoSaveStatus');
            const statusIcon = autoSaveStatus.querySelector('.status-icon');
            const statusText = autoSaveStatus.querySelector('.status-text');
            const saveTime = autoSaveStatus.querySelector('.save-time');
            
            if (status === 'saved') {
                autoSaveStatus.className = 'auto-save-status saved';
                statusIcon.textContent = '✓';
                statusText.textContent = '已自动保存';
                const now = new Date();
                saveTime.textContent = now.getHours().toString().padStart(2, '0') + ':' + 
                                       now.getMinutes().toString().padStart(2, '0') + ':' + 
                                       now.getSeconds().toString().padStart(2, '0');
            } else if (status === 'saving') {
                autoSaveStatus.className = 'auto-save-status saving';
                statusIcon.textContent = '⏳';
                statusText.textContent = '正在保存...';
            } else if (status === 'error') {
                autoSaveStatus.className = 'auto-save-status error';
                statusIcon.textContent = '✗';
                statusText.textContent = '保存失败';
            }
        }

        // 自动保存功能
        let autoSaveTimer = null;
        function startAutoSave() {
            // 每30秒自动保存一次
            autoSaveTimer = setInterval(() => {
                saveContract();
            }, 30000);
        }

        // 页面加载时启动自动保存
        document.addEventListener('DOMContentLoaded', function() {
            startAutoSave();
            
            // 尝试恢复之前保存的数据
            const savedData = localStorage.getItem('contractEditData');
            if (savedData) {
                try {
                    const contractData = JSON.parse(savedData);
                    // 可以在这里提示用户是否恢复数据
                    console.log('发现已保存的合同数据:', contractData);
                } catch (error) {
                    console.error('恢复数据失败:', error);
                }
            }
        });

        function submitContract() {
            document.getElementById('submitConfirmModal').classList.add('show');
        }

        let submitAction = 'save';

        function selectSubmitOption(element, action) {
            document.querySelectorAll('.submit-option').forEach(opt => opt.classList.remove('selected'));
            element.classList.add('selected');
            submitAction = action;
        }

        function closeSubmitModal() {
            document.getElementById('submitConfirmModal').classList.remove('show');
        }

        function confirmSubmit() {
            if (submitAction === 'save') {
                saveContract();
                closeSubmitModal();
            } else {
                const contractName = document.getElementById('contractName').value.trim();
                if (!contractName) {
                    showToast('请输入合同名称');
                    return;
                }
                
                // 清除自动保存的数据
                localStorage.removeItem('contractEditData');
                
                const now = new Date();
                const timeStr = now.getFullYear() + '-' + 
                    String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                    String(now.getDate()).padStart(2, '0') + ' ' + 
                    String(now.getHours()).padStart(2, '0') + ':' + 
                    String(now.getMinutes()).padStart(2, '0');
                document.getElementById('submitTime').textContent = timeStr;
                
                closeSubmitModal();
                document.getElementById('waitingPage').classList.add('show');
            }
        }

        function backToList() {
            window.location.href = 'pc-contract-list.html';
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
            
            const sections = ['basicInfo', 'contractContent', 'stageSection', 'attachmentSection'];
            
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

        document.addEventListener('click', function(e) {
            const dropdown = document.querySelector('.pc-user-dropdown');
            const menu = document.getElementById('userDropdownMenu');
            if (dropdown && menu && !dropdown.contains(e.target)) {
                menu.classList.remove('show');
            }
            
            const templateModal = document.getElementById('templateSelectModal');
            if (templateModal && e.target === templateModal) {
                closeTemplateModal();
            }
            
            const stageTemplateModal = document.getElementById('stageTemplateModal');
            if (stageTemplateModal && e.target === stageTemplateModal) {
                closeStageTemplateModal();
            }
        });

        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role');
        const contractId = urlParams.get('contractId');
        const status = urlParams.get('status');

        if (role === 'operator') {
            document.querySelector('.pc-role-switcher .pc-role-btn:first-child').click();
        }

        if (status) {
            updateStatusBanner(status);
        }

        function updateStatusBanner(status) {
            const banner = document.getElementById('statusBanner');
            const title = document.getElementById('statusTitle');
            const desc = document.getElementById('statusDesc');
            const actions = document.getElementById('statusActions');

            const statusConfig = {
                'draft': {
                    class: 'draft',
                    title: '📝 合同拟定中',
                    desc: '合同编号：BJSDSWHT000001 | 创建时间：2024-01-10 15:00',
                    actions: '<button class="btn btn-primary" onclick="submitContract()">提交审核</button>'
                },
                'draft_submittable': {
                    class: 'draft',
                    title: '📝 合同拟定中（可提交）',
                    desc: '合同编号：BJSDSWHT000001 | 已完成编辑，可提交审核',
                    actions: '<button class="btn btn-primary" onclick="submitContract()">提交审核</button>'
                },
                'platform_reviewing': {
                    class: 'confirmed',
                    title: '⏳ 待平台审核',
                    desc: '合同编号：BJSDSWHT000001 | 提交时间：2024-01-10 16:00',
                    actions: '<button class="btn" onclick="showDetail()">查看详情</button>'
                },
                'platform_rejected': {
                    class: 'rejected',
                    title: '❌ 平台审核驳回',
                    desc: '合同编号：BJSDSWHT000001 | 驳回时间：2024-01-10 17:00',
                    actions: '<button class="btn btn-primary" onclick="submitContract()">重新提交</button><button class="btn" onclick="showRejectReason()">查看驳回原因</button>'
                }
            };

            const config = statusConfig[status] || statusConfig['draft'];
            banner.className = 'contract-status-banner ' + config.class;
            title.textContent = config.title;
            desc.textContent = config.desc;
            actions.innerHTML = config.actions;
        }

        initQuickNav();
        renderAttachmentList();
    