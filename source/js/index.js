var vm = new Vue ({
    el: "#app",
    data: {
        todo_tasks: [
            {
                title: '行銷提案簡報完成',
                tomato_done: 3,
                tomato_undo: 2,
                doing: true
            },
            {
                title: '線上雜誌銷售管道蒐集',
                tomato_done: 0,
                tomato_undo: 2,
                doing: false
            },
            {
                title: '律師事務所課程行銷文案',
                tomato_done: 0,
                tomato_undo: 1,
                doing: false
            },
            {
                title: '音樂會今日文案圖片設計',
                tomato_done: 0,
                tomato_undo: 2,
                doing: false
            }
        ],
        done_tasks: [
            {
                title: '把首頁介面的流程圖整理出來'
            },
            {
                title: '讀完《資訊架構學》第一章'
            },
            {
                title: '把交換學生的課表整理完送出給學校'
            },
            {
                title: '把講座心得整理成一篇文章'
            },
        ]
    }
})