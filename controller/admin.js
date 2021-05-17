const CreateElement = require('../model/createElements');


exports.adminHomePage = (req, res, next) => {
    res.render('../views/admin/adminIndex', 
    { title: "Admin Home Page"

    });
}

exports.adminCreatePage = (req, res, next) => {
    res.render('../views/admin/createPage', 
    { title: "Admin create page"});
}

exports.getAdminElementPage = (req, res, next) => {
    CreateElement.find().sort({nameOfElement: 'asc'})
    .then(result => {
        res.render('../views/admin/createElement', 
        { title: "Create Element for Website",
          data: result
        });
       
    })
    .catch(err => {
        console.log('getAdminElementPage: ', err);
    })
}

exports.postAdminCreateElementPage = (req, res, next) => {
    // const nameOfElement = JSON.parse(JSON.stringify(req.body.contentType))
    const nameOfElement = req.body.nameOfElement;
    const typeOfData = req.body.contentType;
    const numberOfCharacters = req.body.characterLimmit;

    if(nameOfElement !== null && nameOfElement !== undefined && nameOfElement !== ""
        &&  typeOfData !== null &&  typeOfData !== undefined &&  typeOfData !== "" && typeOfData !== "-- Please choose an option --"
        && numberOfCharacters !== null && numberOfCharacters !== undefined && numberOfCharacters !== "") {
            const newElement = new CreateElement({
                nameOfElement: nameOfElement,
                typeOfData: typeOfData,
                numberOfCharacters: numberOfCharacters});
            newElement.save()
            .then(result => {
                res.redirect('/admin/create-element');
            })
            .catch(err => {
                console.log('postAdminElementPage: ', err);
                }
            );
    }else {
            res.redirect('/admin/create-element');
        }
}

exports.postDeleteElementPage = (req, res, next) => {
    const deleteId = req.body.deleteId;
    CreateElement.deleteOne({_id: deleteId}, () => {
        res.redirect('/admin/create-element');
    })
    .then(result => {
        console.log('this is the id:', id);
 
    })
    .catch(err => {
        console.log('postDeleteElementPage: ', err);
    })

}

exports.postEditElement = (req, res, next) => {
    const elementId = req.body.id;
    const newNameOfElement = req.body.nameOfElement;
    const newTypeOfData = req.body.contentType;
    const newNumberOfCharacters = req.body.editCharacterLimmit;
    const optionCheck = '-- Please choose an option --'
    // console.log(elementId);
    if(newTypeOfData !== optionCheck){
        CreateElement.findOneAndUpdate(
            {_id: elementId}, 
            {nameOfElement: newNameOfElement,
            typeOfData: newTypeOfData,
            numberOfCharacters: newNumberOfCharacters 
        })
        .then(result => {
            console.log('Updated: postEditElementControlFunction');
            res.redirect('/admin/create-element');
        })
        .catch(err => {
            console.log('admin.js postEditElement: ', err);
        })
    }else {
        CreateElement.findOneAndUpdate(
            {_id: elementId}, 
            {nameOfElement: newNameOfElement,
            numberOfCharacters: newNumberOfCharacters
        })
        .then(result => {
            console.log('Updated: postEditElementControlFunction');
            res.redirect('/admin/create-element');
        })
        .catch(err => {
            console.log('admin.js postEditElement: ', err);
        })
    }
}