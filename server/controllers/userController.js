const mysql=require('mysql');
// connection pool
const pool=mysql.createPool({
    connectionLimit:100,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

exports.view=(req,res)=>{

    pool.getConnection((err,connection)=>{
        if (err) throw err;
    

        // use the connection

        connection.query('SELECT * FROM user',(err,rows)=>{
            connection.release();
            if(!err){
                res.render('home',{rows});
            }
            else{
                console.log(err);
            }


        });


    });
}

// find user by search
exports.find=(req,res)=>{
    pool.getConnection((error,connect)=>{
        if (error) throw error;
    let se=req.body.search;
    connect.query('SELECT * FROM user WHERE first_name LIKE ?  OR last_name LIKE ?;' ,['%' +se+ '%','%' +se +'%'],(err,rows)=>{
        connect.release();
        if(!err){
            res.render('home',{rows})
        }
        else{
            console.log(err);
        }
        console.log('data',rows);

    });
})
    
}

exports.user=(req,res)=>{
    res.render('add-user');
}


exports.form=(req,res)=>{
const {first_name,last_name,email,phone,comments}=req.body;

    pool.getConnection((err,con)=>{
        if(err) throw err;
        con.query('INSERT INTO user SET first_name=?,last_name=?,email=?,phone=?,comments=?',[first_name,last_name,email,phone,comments],(err,rows)=>{
            con.release();
            if(!err){
                res.render('add-user' ,{alert:'user added successfully'});
            }
            else{
                console.log(err);
            }
        
        });

    });

}

exports.edit=(req,res)=>{
    
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        conn.query('SELECT * FROM user WHERE id=?',[req.params.id],(err,rows)=>{
            conn.release();
           if(!err){
               res.render('edit-user',{rows});
           }
           else{
               console.log(err);
           }
        })
    })
}


exports.update=(req,res)=>{
    const{first_name,last_name,email,phone,comments}=req.body;
    pool.getConnection((err,con)=>{
        if(err) throw err;
        con.query('UPDATE user SET first_name=?,last_name=?,email=?,phone=?,comments=? WHERE id =?',[first_name,last_name,email,phone,comments,req.params.id],(er,rows)=>{
            con.release();
            if(!er){
                pool.getConnection((err,conn)=>{
                    if(err) throw err;
                    conn.query('SELECT * FROM user WHERE id=?',[req.params.id],(err,rows)=>{
                        conn.release();
                       if(!err){
                           res.render('edit-user',{rows,alert:`${first_name} has updated`});
                       }
                       else{
                           console.log(err);
                       }
                    })
                })
            } 
            else{
                console.log(er);
            }
        })
    })
}

exports.delete=(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        conn.query('Delete  FROM user WHERE id=?',[req.params.id],(er,rows)=>{
            conn.release();
            if(!er){
                res.redirect('/');
            }
            else{
                console.log(er);
            }
        })
    })
}

exports.see=(req,res)=>{
    pool.getConnection((er,con)=>{
        if(er) throw er;
        con.query('SELECT * FROM user WHERE id=?',[req.params.id],(error,rows)=>{
            con.release();
            if(!error){
                res.render('view',{rows});
            }
            else{
                console.log(error);
            }
        })
    })
}








