const Subscription = require('./subSchema'); 
// Create a new subscription
const createSubscription = async (req, res) => {
    try {

const exsub=await Subscription.findOne({ readerId:req.body.readerId})
if(exsub){
  return res.status(200).json({
        status: 400,
        message: 'You have Already Subscribed To This Plan !!'
    });
}
        const newSubscription = new Subscription({
            readerId:req.body.readerId,
            planId:req.body.planId
        });
        const savedSubscription = await newSubscription.save();
        res.status(200).json({
            status: 200,
            message: 'Subscription created successfully',
            data: savedSubscription
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find().populate('readerId').exec();
        res.status(200).json({
            status: 200,
            message: 'Subscriptions retrieved successfully',
            data: subscriptions
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

// Get a subscription by ID
const getSubscriptionById = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id).populate('readerId').exec();
        if (!subscription) {
            return res.status(404).json({
                status: 404,
                message: 'Subscription not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Subscription retrieved successfully',
            data: subscription
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
// Get a subscription by ID
const getSubscriptionByReaderId = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({readerId:req.params.id}).populate('readerId').exec();
        if (!subscription) {
            return res.status(404).json({
                status: 404,
                message: 'Subscription not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Subscription retrieved successfully',
            data: subscription
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
//  Upgrade a new subscription
const upgradeSubscription = async (req, res) => {
    try {

        const sub=await Subscription.findOne({ readerId:req.body.readerId})
const exsub=await Subscription.findOne({ readerId:req.body.readerId, planId:req.body.planId})
if(exsub){
  return res.status(200).json({
        status: 400,
        message: 'You have Already Subscribed To This Plan !!'
    });
}
await Subscription.findOneAndDelete({ readerId:req.body.readerId, planId:sub.planId})

        const newSubscription = new Subscription({
            readerId:req.body.readerId,
            planId:req.body.planId
        });
        const savedSubscription = await newSubscription.save();
        res.status(200).json({
            status: 200,
            message: 'Subscription created successfully',
            data: savedSubscription
        });
  
    await Subscription.findOneAndDelete({ readerId:req.body.readerId, planId:sub.planId})
} catch (error) {
    res.status(500).json({
        status: 500,
        message: error.message
    });
}
};

module.exports={
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    getSubscriptionByReaderId,
    upgradeSubscription
}