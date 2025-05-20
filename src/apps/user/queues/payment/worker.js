import { Booking } from '../../../../models/booking.model.js';
import admin from '../../../../config/fierbase.js';

export const processPayment = async (job) => {
  const { paymentData } = job.data;

  try {
    const transactionId = paymentData?.data?.merchantTransactionId;
    const status = paymentData.code === 'PAYMENT_SUCCESS' ? 'Paid' : 'Failed';

    if (status) {
      // Step 1: Find the booking using the transaction ID
      const booking = await Booking.findOneAndUpdate(
        { transactionId },
        {
          paymentRef: transactionId,
          bookingStatus: status === 'Paid' ? 'Booked' : 'Pending',
        },
        { new: true }
      );

      if (!booking) {
        console.error('Booking not found for transaction:', transactionId);
        return;
      }

      // Step 2: Fetch deviceToken from Firebase Realtime Database using booking.user_id
      const snapshot = await admin
        .database()
        .ref(`user/${booking.userId}`)
        .once('value');

      const userData = snapshot.val();

      if (!userData || !userData.deviceToken) {
        console.error('Device token not found for user:', booking.userId);
        return;
      }

      const deviceToken = userData.deviceToken;
      console.log(deviceToken);
      


      // Step 3: Send notification
      const res = await admin.messaging().send({
        token: deviceToken,
        notification: {
          title: 'Payment Successful',
          body: `Transaction ${transactionId} completed!`,
        },
      });

      console.log('Booking updated and notification sent:', res);
    }

  } catch (error) {
    console.error('Payment processing failed:', error);
  }
};
