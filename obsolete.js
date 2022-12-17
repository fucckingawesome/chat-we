function account() {
    
    let NAME, COLOR;

    const info = {
        NAME : 'gogong',
        COLOR : '#933A0B'
        
    }

    db.collection('chat_account').doc('gogong').set(info).then( function() {
        console.log('done')
    }).catch( function(error) {
        console.log(error)
    })

}

//account()