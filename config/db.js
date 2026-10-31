export const connentDB =async () => {

    try {
        const mongo_uri=process.env.MONGODB_URI;
        await connect(mongo_uri)
        console.log('MongoDB connected')
    } catch (error) {
        console.log('MongoDB connection error:', error.massage)
    }  
 };