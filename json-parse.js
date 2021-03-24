var json = {
    "isMsgBodySend": true,
    "msgId": "fc5aa746-d18e-4fd1-9c8d-7df85e98e580",
    "msgType": "hub2oms-top-order-update",
    "msgBody": "{\"id\":null,\"tid\":700000000000014,\"content\":\"{\\\"buyerNick\\\":\\\"~vBKe1KKlp+BQaiPA/GL5Ow==~EQPZcdhQJN6j~1~~\\\",\\\"modified\\\":\\\"2020-03-24 21:55:31\\\",\\\"nick\\\":\\\"松下建材旗舰店\\\",\\\"oid\\\":600000000000014,\\\"payment\\\":\\\"99.00\\\",\\\"sellerNick\\\":\\\"松下建材旗舰店\\\",\\\"status\\\":\\\"WAIT_SELLER_SEND_GOODS\\\",\\\"tid\\\":600000000000014,\\\"tradeMark\\\":null,\\\"type\\\":\\\"eticket\\\",\\\"userId\\\":715577065}\",\"status\":\"1\",\"createTime\":1603872942732,\"shopId\":31,\"syncStatus\":1,\"syncCounter\":1,\"syncTime\":1603872942732,\"confirmId\":null,\"confirmTime\":null,\"version\":\"1.2.6\",\"omsShopId\":null,\"orderInfo\":null}",
    "sendTime": "2020-10-28 16:15:42",
    "feedBackTime": null,
    "msgExt": null,
    "produceRouteInfo": "10.102.99.148",
    "consumerRouteInfo": null,
    "produceStoreTime": "2020-10-28 16:15:42",
    "consumerStoreTime": null,
    "topic": "MQ_hub2oms4_top_trade_status_sit",
    "tags": "松下建材旗舰店",
    "splitId": null,
    "mongodbObjectId": null,
    "ossUrl": null,
    "isMsgBodyDB": false,
    "businessKey": null
}
console.log(typeof (json.msgBody))
console.log(JSON.parse(json.msgBody));