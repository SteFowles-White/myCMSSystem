const CreateElement = require('../model/createElements');
const CreatePage = require('../model/createPage');



//------------------------------------------------------
//   Get requests for the admin element pages
//------------------------------------------------------

exports.adminHomePage = (req, res, next) => {
    res.render('../views/admin/adminIndex', 
    { title: "Admin Home Page",
      path: "admin/"
    });
}

exports.adminCreatePage = (req, res, next) => {
    CreateElement.find().sort({nameOfElement: 'asc'})
    .then(result => {
        // console.log(result);
        res.render('../views/admin/createPage', 
        { title: "Admin create page",
          path: "admin/create-page",
          elements: result});
    })
    .catch(err => {
        console.log('results');
    })
    
}

exports.getAdminElementPage = (req, res, next) => {
    CreateElement.find().sort({nameOfElement: 'asc'})
    .then(result => {
        res.render('../views/admin/createElement', 
        { title: "Create Element for Website",
          data: result,
          path: "admin/create-element"
        });
       
    })
    .catch(err => {
        console.log('getAdminElementPage: ', err);
    })
}



//------------------------------------------------------
//   post requests for the admin element pages
//------------------------------------------------------


exports.postAdminCreateElementPage = (req, res, next) => {
    // const nameOfElement = JSON.parse(JSON.stringify(req.body.contentType))
    const nameOfElement = req.body.nameOfElement;
    const typeOfData = req.body.contentType;
    const numberOfCharacters = req.body.characterLimmit;

    // check to see if any incomming data is null empty or blank
    if(nameOfElement !== null && nameOfElement !== undefined && nameOfElement !== ""
        &&  typeOfData !== null &&  typeOfData !== undefined &&  typeOfData !== "" && typeOfData !== "-- Please choose an option --"
        && numberOfCharacters !== null && numberOfCharacters !== undefined && numberOfCharacters !== "") {
            
            // create a new element data and set up with the incoming data

            const newElement = new CreateElement({
                nameOfElement: nameOfElement,
                typeOfData: typeOfData,
                numberOfCharacters: numberOfCharacters});
            // save new Element to the database
            newElement.save()
            .then(result => {
                // redirect to admin/create-element
                res.redirect('/admin/create-element');
            })
            .catch(err => {
                //log error should one occour
                console.log('postAdminElementPage: ', err);
                }
            );
    }else {
            //if data is null empty or blank then redirect to the admin/create-element
            // this needs more work - maybe a form validator on the front end to ensure this does fail safe does not happen
            res.redirect('/admin/create-element');
        }
}

exports.postDeleteElementPage = (req, res, next) => {
    const deleteId = req.body.deleteId;
    CreateElement.deleteOne({_id: deleteId}, () => {
        res.redirect('/admin/create-element');
    })
    .then(result => {
        // console.log('this is the id:', id);
 
    })
    .catch(err => {
        console.log('postDeleteElementPage: ', err);
    })

}

//post request to edit the current element on the database
exports.postEditElement = (req, res, next) => {
    //assign incomming information
    const elementId = req.body.id;
    const newNameOfElement = req.body.nameOfElement;
    const newTypeOfData = req.body.contentType;
    const newNumberOfCharacters = req.body.editCharacterLimmit;
    //test for the type of data to ensure that '-- Please choose an option --' is not submitted
    const optionCheck = '-- Please choose an option --'

    //check that new data type is filled in correctly
    if(newTypeOfData !== optionCheck){
        //find the element in the databse with the same unique id and update with new information
        CreateElement.findOneAndUpdate(
            {_id: elementId}, 
            {nameOfElement: newNameOfElement,
            typeOfData: newTypeOfData,
            numberOfCharacters: newNumberOfCharacters 
        })
        .then(result => {
            // console.log('Updated: postEditElementControlFunction');
            res.redirect('/admin/create-element');
        })
        .catch(err => {
            console.log('admin.js postEditElement: ', err);
        })
    }else {
        //if the new data type is not updated then update all the other element - this is safty mesure for the data type
        CreateElement.findOneAndUpdate(
            {_id: elementId}, 
            {nameOfElement: newNameOfElement,
             numberOfCharacters: newNumberOfCharacters
        })
        .then(result => {
            // console.log('Updated: postEditElementControlFunction');
            res.redirect('/admin/create-element');
        })
        .catch(err => {
            console.log('admin.js postEditElement: ', err);
        })
    }
}

exports.postCreatePage = (req, res, next) => {
    const pageName = req.body.nameOfPage;
    const titleName = req.body.titleOfPage;
    const metaDescriptionName = req.body.metaDescirptionOfPage;

    console.log(pageName, titleName, metaDescriptionName);
    console.log(req.body);
    const createPage = new CreatePage({
        nameOfPage: pageName,
        titleOfPage: titleName,
        metaDescription: metaDescriptionName
    });
    // console.log(createPage);
    createPage.save()
    .then(result => {
        res.redirect('/admin/create-page')
    }).catch(err => {
        console.log('CREATE PAGE FAILED')
    });

}