module.exports = options =>{


    return async function  adminauth(ctx,next){
       console.log(ctx.session.openId)
        if(ctx.session.openId){
            console.log('middleware true')
            await next()
        }else{
            console.log('middleware false')
            ctx.body = {dataMessage:'Waring :Sorry You need to login',data:777}
        }
    }
}