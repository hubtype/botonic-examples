import MapMessage from './map-message'
import BotIconPurple from '../assets/bot-icon-purple.svg'
import BotIconWhite from '../assets/bot-icon-white.svg'
import 'leaflet/dist/leaflet.css'
import { CustomHeader } from './custom-header'
import { PRIMARY_COLOR } from './constants'

export const webchat = {
  storage: sessionStorage,
  storageKey: 'botonic-nlu-example',
  shadowDOM: true,

  onInit: app => {
    app.clearMessages()
    app.open()
  },
  onOpen: app => app.addUserText('hi'),
  theme: {
    style: {
      fontFamily: '"Helvetica Neue",Arial,sans-serif',
      width: 350,
      borderRadius: 10,
    },
    header: {
      image: BotIconWhite,
      title: 'Botonic NLU Assistant',
      subtitle: '🟢 Online',
      custom: CustomHeader,
    },
    brand: {
      color: `${PRIMARY_COLOR}`,
    },
    triggerButton: {
      image: BotIconPurple,
    },
    scrollbar: {
      autoHide: true,
      thumb: {
        opacity: 1,
        bgcolor: `linear-gradient(-131deg,#B09BFF 0%,${PRIMARY_COLOR} 100%)`,
        border: '20px',
      },
    },
    message: {
      bot: {
        blobWidth: '75%',
        blobTick: false,
        image: BotIconPurple,
        style: {
          background: 'white',
          border: `1px solid ${PRIMARY_COLOR}`,
        },
      },
      customTypes: [MapMessage],
    },
    userInput: {
      style: {
        background: `linear-gradient(90deg,${PRIMARY_COLOR} 0%, rgba(46, 32, 59, 1) 100%)`,
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
      },
      box: {
        style: {
          fontFamily: '"Helvetica Neue",Arial,sans-serif',
          border: '2px solid white',
          color: `${PRIMARY_COLOR}`,
          background: 'white',
          width: '90%',
          borderRadius: 20,
          paddingLeft: 20,
          marginLeft: 10,
          marginRight: 10,
        },
        placeholder: 'Type something...',
      },
    },
    markdownStyle: `
    p { 
      font-size: 16px; 
      font-weight: 300; 
      line-height: 1.5625; 
      margin: 0px;
    }

    h3 {
      margin: 5px;
    }

    table {
      margin-top: 10px;
      border-collapse: collapse;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      border-radius:5px;
    }
    
    th,
    td {
      border-radius:5px;
      padding: 7px;
      background-color: rgba(255,255,255,0.2);
      color: black;
      text-align: center;
    }
    
    thead {
      border-radius:5px;
      border: 2px solid ${PRIMARY_COLOR};
      th {
        border-radius:0px;
        border: 1px solid ${PRIMARY_COLOR};
        background-color: #F1EEFF;
      }
    }
    
    tbody {
      border-radius:5px;
      border: 2px solid ${PRIMARY_COLOR};
      tr {
        &:hover {
          background-color: rgba(255,255,255,0.3);
        }
        border: 1px solid ${PRIMARY_COLOR};
      }
      td {
        border: 1px solid ${PRIMARY_COLOR};
        position: relative;
        &:hover {
          &:before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: -9999px;
            bottom: -9999px;
            background-color: rgba(255,255,255,0.2);
            z-index: -1;
          }
        }
      }
    `,
  },
}
