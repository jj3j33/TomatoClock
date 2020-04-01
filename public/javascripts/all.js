Vue.component('dialogbox', {
    template: '#dialogbox',
    props: ["add"],
    data: function(){
        return {
            task_name: '',
            amount: 1
        };
    },
    methods: {
        add_task(){
            this.$emit('add_task', this.task_name, this.amount);
            this.add = false;
            this.$emit('cancel_add', this.add);
            this.task_name = '';
            this.amount = 1;
        },
        cancel_add(){
            this.add = false;
            this.$emit('cancel_add', this.add);
        }
    }
});

var vm = new Vue ({
    el: "#app",
    data: {
        todo_tasks: [
            {
                title: '行銷提案簡報完成',
                tomato_done: 3,
                tomato_undo: 2,
                status: 'stop'
            },
            {
                title: '線上雜誌銷售管道蒐集',
                tomato_done: 0,
                tomato_undo: 2,
                status: 'stop'
            },
            {
                title: '律師事務所課程行銷文案',
                tomato_done: 0,
                tomato_undo: 1,
                status: 'stop'
            },
            {
                title: '音樂會今日文案圖片設計',
                tomato_done: 0,
                tomato_undo: 2,
                status: 'stop'
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
        ],
        alarm_music: [
            {
                name: 'NONE'
            },
            {
                name: 'BEEP'
            },
            {
                name: 'DEFAULT'
            },
            {
                name: 'ALERT'
            },
            {
                name: 'WARNING'
            },
            {
                name: 'DIGITAL'
            },
            {
                name: 'BIRD'
            },
            {
                name: 'ALARM'
            },
            {
                name: 'MUSIC'
            },
            {
                name: 'DROP'
            },
            {
                name: 'BELL'
            },
            {
                name: 'HORN'
            }
        ],
        time: {
            min: 25,
            sec: 0
        },
        add: false,
        stop: false,
        rest: false,
        countdown: false,
        menu_mode: 'task',
        work_alarm: 'NONE',
        rest_alarm: 'NONE',
        sort_mode: false,
        doing_task: 0,
        clock_mode: 'focus',
        chart_mode: 'tomato'
    },
    computed: {
        // clockstyle() {
        //     if(this.time.sec<30){
        //         return {
        //             backgroundColor: '#000'
        //         }
        //     }
        //     else {
        //         return {
        //             backgroundColor: '#fff'
        //         }
        //     }
        // }
    },
    methods: {
        add_task(task_name, amount) {
            this.todo_tasks.push({
                'title': task_name,
                'tomato_done': 0,
                'tomato_undo': amount,
                'doing': false
            });
        },
        remove_task(tid) {
            if(tid==this.doing_task && this.todo_tasks[this.doing_task].status != 'stop'){
                this.stop = true;
            }
            else{
                this.todo_tasks.splice(tid, 1);
            } 
        },
        stop_doingTask() {
            this.countdown = false;
            window.clearInterval(vm.timeOutRefresh);
            this.time = {
                min: 25,
                sec: 0
            };
            this.stop = false;
            this.clock_mode = 'focus';
            this.todo_tasks[this.doing_task].status = 'stop';
            this.doing_task = 0;
        },
        startCountdown() {
            this.countdown = true;
            this.todo_tasks[this.doing_task].status = 'playing';
            this.timeOutRefresh = window.setInterval( () => {
                if(this.time.min == 0 && this.time.sec == 0){
                    if(this.clock_mode=='focus'){
                        if(this.todo_tasks[this.doing_task].tomato_undo>1){
                            this.todo_tasks[this.doing_task].tomato_done += 1;
                            this.todo_tasks[this.doing_task].tomato_undo -= 1;
                            this.time = {
                                min: 5,
                                sec: 0
                            };
                            this.clock_mode = 'rest';
                        }
                        else if(this.todo_tasks[this.doing_task].tomato_undo==1){
                            this.done_tasks.push({
                                'title': this.todo_tasks[this.doing_task].title
                            });
                            this.todo_tasks.splice(this.doing_task, 1);
                            this.doing_task = 0;
                            this.time = {
                                min: 25,
                                sec: 0
                            };
                            this.countdown = false;
                            window.clearInterval(vm.timeOutRefresh);
                            this.todo_tasks[this.doing_task].status = 'stop';
                            return 0;
                        }     
                    }
                    else if(this.clock_mode=='rest'){
                        this.time = {
                            min: 25,
                            sec: 0
                        };
                        this.clock_mode = 'focus';
                    }
                }
                if(this.time.sec == 0){
                    this.time.min--;
                    this.time.sec = 59;
                }
                else{
                    this.time.sec--;
                } 
            }, 1000);
        },
        pauseCountdown() {
            this.countdown = false;
            window.clearInterval(vm.timeOutRefresh);
            this.todo_tasks[this.doing_task].status = 'pause';
        },
        sort_up(tid) {
            var temp_task = this.todo_tasks[tid-1];
            Vue.set(this.todo_tasks, tid-1, this.todo_tasks[tid]);
            Vue.set(this.todo_tasks, tid, temp_task);
        },
        sort_down(tid) {
            var temp_task = this.todo_tasks[tid+1];
            Vue.set(this.todo_tasks, tid+1, this.todo_tasks[tid]);
            Vue.set(this.todo_tasks, tid, temp_task);
        },
        play_task(tid) {
            var isDoing = this.todo_tasks.filter( (o) => {
                return o.status != 'stop';
            });
            if(isDoing.length != 0){
                this.stop = true;
            }
            else{
                this.doing_task = tid;
                this.startCountdown();
            }
            
        },
        toRest() {
            this.time = {
                min: 5,
                sec: 0
            };
            this.clock_mode = 'rest';
            this.rest = false;
        }
        // pause_task(tid) {
        //     this.todo_tasks[tid].status = 'pause';
        //     this.pauseCountdown();
        // },
        // continue_task(tid) {
        //     this.todo_tasks[tid].status = 'playing';
        //     this.startCountdown();
        // }
    }
});