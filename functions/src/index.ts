/* eslint-disable */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// 外部から叩きたいときは必ずexport をつける
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// APIを叩いた時にレスポンスを返す関数
const sendResponse = (response: functions.Response, statusCode: number, body: any) => {
  response.send({
    statusCode,
    body:JSON.stringify(body)
  })
}


// 
export const addDataset = functions.https.onRequest( async (req: any, res: any) => {
  if (req.method !== 'POST') {
    sendResponse(res, 405, { errors: 'Invalid Request!' });
  } else {
    const dataset = req.body;
    
    // object型なのでobjectのkeyを回す
    for (const key of Object.keys(dataset)) {
      const data = dataset[key];

      // questionというコレクションにデータを格納していく
      await db.collection('question').doc(key).set(data);

    }
    sendResponse(res, 200, {message:'Successfully added dataset!'})
  }
})