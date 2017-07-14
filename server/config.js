module.exports = {

    secret_landlord: 'fsl_io_landlords',
    secret_user: 'fsl_io_users',
    database_mLab: 'mongodb://thanhannguyen:Thanhan200114050@ds143211.mlab.com:43211/fsl_io',
    database_local: 'mongodb://localhost:27017/FSL_IO',
    email: 'fslio.startup@gmail.com',
    password: 'fslio@abc123',
    urlVerifyAccount: 'https://hcmutefslio.herokuapp.com/api/v1/landlord/verify/verify-account/?token=',
    urlVerifyAccount_User: 'https://hcmutefslio.herokuapp.com/api/v1/user/verify/verify-account/?token=',
    elasticsearch: {
        // endpoint: "https://hcmutefslio.herokuapp.com",
        endpoint: "https://localhost:3300",
        bonsaiHostEndpoint: "https://6glgrg0luh:v15s34wabn@first-cluster-9274533718.us-west-2.bonsaisearch.net",
        //bonsaiHostEndpoint: "https://5f40ab42130d8ebe15f6f2d120897b9b.ap-northeast-1.aws.found.io",
        index: "fsl_io",
        house_type: "house"
    },

}