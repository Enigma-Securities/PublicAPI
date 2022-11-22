const WebSocket = require('ws')
const Stream = require('stream')

const readableStream = new Stream.Readable()
readableStream._read = () => {}

const url = '{ENV_ENDPOINT}'
const api_key = `{YOUR_KEY}`

const start = async () => {
  const ws = new WebSocket(url, {
    headers: {
      'X-API-KEY': api_key,
    },
  })

  ws.on('open', async () => {
    send_trade_msg(ws)
    send_sett_msg(ws)
    send_leg_msg(ws)
    send_transaction_msg(ws)
  })

  ws.on('message', (incomingMessage) => {
    console.log(JSON.parse(incomingMessage))
  })

  ws.on('close', (code, reason) => {
    ws.terminate()
    console.log(`connection terminated! Code: ${code} | Reason: ${reason}`)
    setTimeout(async () => {
      await start()
    }, 5000)
  })

  ws.on('error', (error) => {
    console.error('Cannot connect. Trying again in 5s...')
    ws.close()
  })
}

start()

const send_trade_msg = (ws) => {
  const msg = {
    type: 'trades_blotter',
    id: 'bf5d15d0-415f-11ec-b255-ad01e0712738',
    data: {
      // limit: 30,
      // offset: 0,
      // decimal: 2,
      // order_by: 'side',
      // sort: 'ASC',
      // id: 'bf2235d0-415f-12we-b255-ad01e0712738',
      // from_date: '2021-01-01',
      // to_date: '2022-01-01',
      // status: ['VALIDATED', 'REJECTED', 'CANCELED'],
      // type: ['MKT QUANTITY', 'MKT NOMINAL', 'LIMIT FOK'],
      // service: ['OTC', 'API'],
      // protocol: ['WS', 'REST', 'FIX'],
      // side: ['BUY', 'SELL'],
      // products: ['BTC-USD'],
      // offset_from: 'e5a23ca9-5cec-11ec-a58b-9c7bef452fa0',
      // page_direction: 'NEXT',
      // csv: true,
    },
  }
  ws.send(JSON.stringify(msg))
}

const send_sett_msg = (ws) => {
  const msg = {
    type: 'settlement_blotter',
    id: 'bf5d15d0-415f-11ec-b255-ad01e0712738',
    data: {
      // limit: 30,
      // offset: 0,
      // order_by: 'creation_date',
      // sort: 'ASC',
      // from_date: '2021-01-01',
      // to_date: '2022-01-01',
      // offset_from: 'e5a23ca9-5cec-11ec-a58b-9c7bef452fa0',
      // page_direction: 'NEXT',
      // id: 'e5a23ca9-5cec-11ec-a58b-9c7bef452fa0',
      // currencies: ['BTC', 'USD'],
      // status: ['PENDING', 'PROCESSING', 'SETTLED', 'CANCELED', 'CREATED'],
      // csv: true,
    },
  }
  ws.send(JSON.stringify(msg))
}

const send_leg_msg = (ws) => {
  const msg = {
    type: 'settlement_leg_blotter',
    id: 'bf5d15d0-415f-11ec-b255-ad01e0712738',
    data: {
      // limit: 30,
      // offset: 0,
      // order_by: 'creation_date',
      // sort: 'ASC',
      // from_date: '2021-01-01',
      // to_date: '2022-01-01',
      // offset_from: 'e5a23ca9-5cec-11ec-a58b-9c7bef452fa0',
      // page_direction: 'NEXT',
      // id: 'e5a23ca9-5cec-11ec-a58b-9c7bef452fa0',
      // currencies: ['BTC', 'ETH'],
      // status: ['CREATED', 'PENDING', 'PROCESSING', 'VALIDATED', 'SETTLED', 'REJECTED'],
      // csv: false,
    },
  }
  ws.send(JSON.stringify(msg))
}

const send_transaction_msg = (ws) => {
  const msg = {
    type: 'transaction_blotter',
    id: 'bf5d15d0-415f-11ec-b255-ad01e0712738',
    data: {
      // limit: 30,
      // offset: 0,
      // order_by: 'creation_date',
      // sort: 'ASC',
      // from_date: '2021-01-01',
      // to_date: '2022-01-01',
      // offset_from: 'e5a23ca9-5cec-11ec-a58b-9c7bef452fa0',
      // page_direction: 'NEXT',
      // id: 'e5a23ca9-5cec-11ec-a58b-9c7bef452fa0',
      // currencies: ['BTC', 'USD'],
      // status: ['PENDING', 'VALIDATED', 'REJECTED'],
      // type: ['PREFUNDING', 'ACCOUNT'],
      // csv: true,
    },
  }
  ws.send(JSON.stringify(msg))
}
