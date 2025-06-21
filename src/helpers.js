export const formatDate = (date) => {
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);

    const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(date);
    const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
    const year = date.getFullYear();

    return `${weekday}, ${day}${daySuffix} ${month} ${year}`;
}
  
function getDaySuffix(day) {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

export const pendingTasksSerializer = (data) => {
    return data.map(item => {      
        return {
            id: item.id,
            status: item?.status,
            classId: item?.Class?.id,
            className: item?.Class?.name,
            date: item?.Date,
        };
    });
};

export const getFormattedDate = (date) => {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
}

export const classStudentsSerializer = (data) => {
    return data.map(item => {
        return {
            id: item.id,
            name: item.name,
        };
    });
}

export const validateAttendanceCompletion = (attendanceState) => {
    let isComplete = true;
    attendanceState.forEach((item) => {
        if (item?.status === '') {
            isComplete = false;
            return;
        }
    });
    return isComplete;
}