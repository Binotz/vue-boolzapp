var app = new Vue({
    el:'#app',
    data:{
        activeChat: 0,
        messageText: '',
        queryName: '',
        showMessageOptionIndex: null,
        dropDownChatMenuToggle: false,
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        quotes:[
           "Combatti, per questa libert?? sono pronto a sacrificare tutto! Non ha importanza quanto questo mondo possa sembrarti orribile, non ha importanza quanto questo mondo sia crudele: combatti!", "Solo chi ?? pronto a rinunciare a ci?? a cui tiene di pi?? sar?? in grado di cambiare le cose.","Per ottenere dei risultati, non c'?? niente di meglio del dolore fisico.","Questo mondo ?? sempre stato crudele, i forti hanno sempre oppresso i deboli e tutti fingevano di non accorgersene. ","Stanno tutti preparandosi ad uccidere i giganti solo per starne il pi?? lontani possibile.", "Il tenere alla propria vita non ?? un istinto da disprezzare.", "Il momento di maggior pericolo ?? quando si sta tutti tranquilli!", "L'unica scelta che abbiamo ?? vivere all'interno delle mura! Ad agire precipitosamente si muore e basta, come i miei genitori!"
        ]  
    },
    methods:{
        currentChat: function(chatIndex){
            this.activeChat = chatIndex;
            this.showMessageOptionIndex = -1;
        },
        sendMessage: function(){
            //Creo il messaggio
            let message = {
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                text: this.messageText,
                status: 'sent'
            };
            //Lo pusho nella lista dei messaggi
            this.contacts[this.activeChat].messages.push(message);
            //pulisco l'input
            this.messageText = '';
            //genero la risposta automatica dopo 1 sec, con text ok
            // setTimeout(()=>{
            //     message = {
            //         date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            //         text: 'ok',
            //         status: 'received'
            //     };
            //     this.contacts[this.activeChat].messages.push(message);
            // },1000);
            //BONUS: random quotes
            let quote = this.quotes[this.getRandomNumber(0, this.quotes.length -1)];
            setTimeout(()=>{
                message = {
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: quote,
                    status: 'received'
                };
                this.contacts[this.activeChat].messages.push(message);
            },1000);
        },
        queryContact: function(){
            //mostro tutti gli utenti nel caso in cui l'input sia vuoto
            if(this.queryName === ''){
                this.contacts.forEach(contact =>{
                    contact.visible = true;
                });
            }
            this.contacts.forEach(contact => {
                let contactNameLowerCase = contact.name.toLowerCase();
                let queryNameToLowerCase = this.queryName.toLowerCase();
                if(!contactNameLowerCase.includes(queryNameToLowerCase)){
                    contact.visible = false;
                } else {
                    contact.visible = true;
                }
            });
        },
        showMessageOption: function(index){
            //mi salvo l'indice del messaggio attualmente cliccato 
            if(this.showMessageOptionIndex === index){
                this.showMessageOptionIndex = -1;
            } else{
                this.showMessageOptionIndex = index;
            }
        },
        hideMessageOption: function(index){
            //resetto l'indice del messaggio delezionato
            this.showMessageOptionIndex = -1;
        },
        deleteMessage: function(index){
            this.contacts[this.activeChat].messages.splice(index, 1);
        },
        sliceMsgPreview: function(msg){
            //se il messaggio ?? lungo pi?? di 30 char, ci appendo i tre puntini 
            if(msg.length > 30){
                msg = msg.slice(0,30) + '...';
            }
            return msg;
        },
        toggleDropDownChatMenu: function(){
            this.dropDownChatMenuToggle = !this.dropDownChatMenuToggle;
        },
        deleteChat: function(){
            this.contacts.splice(this.activeChat,1);
            if (this.activeChat > 0){
                this.activeChat--;
            } else {
                this.activeChat = 0;
            }
        },
        deleteAllMessages: function(){
            this.contacts[this.activeChat].messages = [];
        },
        getRandomNumber: function(min, max){
                return Math.floor(Math.random() * (max - min + 1) ) + min;
        }
    },
    directives:{
        //direttiva custom per chiudere il popup se click fuori dallo stesso
        'click-outside':{
            bind: function (el, binding, vnode) { 
                el.eventOnClick = function (event) {
                    // controllo se il click ?? fuori dall'elemento e i suoi child
                    if (!(el == event.target || el.contains(event.target)) ){
                        //chiamo il metodo passato come attributo, hideMessageOption
                        vnode.context[binding.expression](event);
                    }
                };
                document.addEventListener('click', el.eventOnClick);
                document.addEventListener('touchend', el.eventOnClick);
            }, unbind: function (el) {
                document.removeEventListener('click', el.eventOnClick);
                document.removeEventListener('touchend', el.eventOnClick);
            },
        }
    }});
