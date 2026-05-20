let statementData = {
    id: '1',
    type: 'material',
    typeName: '辅料费',
    amount: 4500.00,
    contract: '基础施工合同',
    description: '现场水电实际超出原合同预估米数，进行实际增项测量结算。',
    status: 'pending',
    creator: '张工长',
    creatorRole: 'foreman',
    createTime: '2026-05-20 10:30',
    confirmer: '李先生',
    confirmerRole: 'owner',
    confirmTime: '',
    rejectReason: ''
};

const typeMap = {
    'worker_wage': '工友工资',
    'material': '辅料费',
    'measure': '措施费',
    'insurance': '保险费',
    'foreman_wage': '工长工资'
};

const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get('status') || 'pending';
const type = urlParams.get('type') || 'material';
const isConfirmer = urlParams.get('role') !== 'creator';

document.addEventListener('DOMContentLoaded', function() {
    initPageData();
    updatePageByStatus();
});

function initPageData() {
    statementData.status = status;
    statementData.type = type;
    statementData.typeName = typeMap[type] || '辅料费';
    
    document.getElementById('typeTag').textContent = statementData.typeName;
    document.getElementById('typeTag').className = 'type-tag ' + type;
    document.getElementById('amountDisplay').textContent = formatAmount(statementData.amount);
    document.getElementById('contractName').textContent = statementData.contract;
    document.getElementById('billType').textContent = statementData.typeName;
    document.getElementById('creatorName').textContent = statementData.creator;
    document.getElementById('createTime').textContent = statementData.createTime;
}

function formatAmount(amount) {
    const prefix = amount < 0 ? '-' : '';
    const absAmount = Math.abs(amount);
    return prefix + '¥ ' + absAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updatePageByStatus() {
    const statusBanner = document.getElementById('statusBanner');
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    const statusDesc = document.getElementById('statusDesc');
    const actionFooter = document.getElementById('actionFooter');
    const rejectReasonBanner = document.getElementById('rejectReasonBanner');
    const confirmInfoCard = document.getElementById('confirmInfoCard');
    
    switch (status) {
        case 'pending':
            statusBanner.className = 'status-banner';
            statusIcon.textContent = '⏳';
            statusText.textContent = '待确认';
            statusDesc.textContent = isConfirmer ? '请确认此对账单' : '等待对方确认';
            
            if (isConfirmer) {
                actionFooter.classList.remove('hidden');
            } else {
                actionFooter.classList.add('hidden');
            }
            break;
            
        case 'effective':
            statusBanner.className = 'status-banner effective';
            statusIcon.textContent = '✅';
            statusText.textContent = '已生效';
            statusDesc.textContent = '账单已确认生效';
            actionFooter.classList.add('hidden');
            
            confirmInfoCard.style.display = 'block';
            document.getElementById('confirmerAvatar').textContent = statementData.confirmer.charAt(0);
            document.getElementById('confirmerName').textContent = statementData.confirmer + '（业主）';
            document.getElementById('confirmTime').textContent = '已于 2026-05-19 14:30 确认';
            
            addLogItem(statementData.confirmer + ' 确认了对账单', '2026-05-19 14:30');
            break;
            
        case 'rejected':
            statusBanner.className = 'status-banner rejected';
            statusIcon.textContent = '❌';
            statusText.textContent = '已驳回';
            statusDesc.textContent = '账单已被驳回';
            actionFooter.classList.add('hidden');
            
            rejectReasonBanner.style.display = 'block';
            document.getElementById('rejectReasonContent').textContent = '数量算错了，现场测量只有20米，请核对后重新发起。';
            
            addLogItem(statementData.confirmer + ' 驳回了对账单', '2026-05-18 16:00');
            break;
    }
}

function addLogItem(text, time) {
    const logList = document.getElementById('logList');
    const logItem = document.createElement('div');
    logItem.className = 'log-item';
    logItem.innerHTML = `
        <div class="log-dot"></div>
        <div class="log-content">
            <div class="log-text">${text}</div>
            <div class="log-time">${time}</div>
        </div>
    `;
    logList.appendChild(logItem);
}

function showConfirmModal() {
    document.getElementById('confirmModalOverlay').classList.add('show');
    document.getElementById('confirmModal').classList.add('show');
}

function hideConfirmModal() {
    document.getElementById('confirmModalOverlay').classList.remove('show');
    document.getElementById('confirmModal').classList.remove('show');
}

function submitConfirm() {
    hideConfirmModal();
    showToast('确认成功，账单已生效');
    
    setTimeout(() => {
        window.location.href = 'statement-list.html';
    }, 1500);
}

function showRejectDrawer() {
    document.getElementById('rejectDrawerOverlay').classList.add('show');
    document.getElementById('rejectDrawer').classList.add('show');
    document.getElementById('rejectReasonInput').focus();
}

function hideRejectDrawer() {
    document.getElementById('rejectDrawerOverlay').classList.remove('show');
    document.getElementById('rejectDrawer').classList.remove('show');
    document.getElementById('rejectReasonInput').value = '';
}

function submitReject() {
    const reason = document.getElementById('rejectReasonInput').value.trim();
    
    if (!reason) {
        showToast('请输入驳回原因');
        return;
    }
    
    showToast('已驳回，对方将收到通知');
    hideRejectDrawer();
    
    setTimeout(() => {
        window.location.href = 'statement-list.html';
    }, 1500);
}

function confirmStatement() {
    showConfirmModal();
}

function previewAttachment(name) {
    showToast('预览：' + name);
}

function showToast(message) {
    const toast = document.getElementById('toastModal');
    const toastContent = document.getElementById('toastContent');
    
    toastContent.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}
