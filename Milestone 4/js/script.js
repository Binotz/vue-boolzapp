var app = new Vue({
    el:'#app',
    data:{
        activeChat: 0,
        messageText: '',
        queryName: '',
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
        ]  
    },
    methods:{
        currentChat: function(chatIndex){
            this.activeChat = chatIndex;
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
            setTimeout(()=>{
                message = {
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: 'ok',
                    status: 'received'
                };
                this.contacts[this.activeChat].messages.push(message);
            },1000);
        },
        queryContact: function(){
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
        }
    }
});
    