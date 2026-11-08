//הרשאות לקליינט מסויים

//בדיקת הרשאות מנהך/משתמש

//log
export const printMsg = (req, res, next) => {
    console.log(`hello from custom middleware: ${req.method} ${req.url}`);
    next();
}

//בדיקת תקינות על הבאדי

export const validateBody = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: 'שגיאה בנתוני הבקשה',
            details: error.details.map(err => err.message)
        });
    }

        req.body = value;
    next();
};




//חסימת האתר בשבתות



//טיפול בשגיאות :
// היחיד שמקבל 4 פרמטרים לטיפול בשגיאות
export const errorHandler = (err, req, res, next) => {
    //err:{Msg,statuse,type}
    const {Msg="",statuse=500,type="Server Error"}=err;
    return res.status(statuse).json({ error:{message: Msg , type } });
}