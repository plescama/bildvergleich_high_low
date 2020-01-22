    PennController.ResetPrefix(null); // Initiates PennController
    PennController.AddHost("https://filedn.com/lDf2Oa0trFMzhcSFiv5VDuu/ibex/"); // 
    loads pictures from external server
  //  PennController.Sequence("welcome", "experiment", "send", "final")
    // Welcome text /////////////
    PennController( //"welcome",
        defaultText
            .print()
        ,
        newText("text1", "<p>Welcome to the experiment!</p>")
        ,
        newText("text2", "<p>Humboldt Universitat zu Berlin, Department of German 
    Language and Linguistics</p>")
        ,
        newText("text3","<p>Please enter your ID and then click the button below to start the experiment.</p>")
        ,
        newTextInput("ID")
            .print()
        ,
        newVar("ID")
            .settings.global()
            .set( getTextInput("ID") )
        ,
        newButton("button1", "continue")
            .print()
            .wait()
        ,
        getText("text1")
            .remove()
        ,
        getText("text2")
            .remove()
        ,
        getText("text3")
            .remove()
        ,
        getTextInput("ID")
            .remove()
        ,
        getButton("button1")
            .remove()
        ,
        newHtml("consentInfo", "consentInfo.html")
            .settings.log()
            .print()
        ,
        newButton("button2", "continue")
            .print()
            .wait(getHtml("consentInfo").test.complete()
                .failure( getHtml("consentInfo").warn() ) // wait and display  warning message if not all the obligatory fields in the html document are filled
              )
        ,
        getHtml("consentInfo")
            .remove()
        ,
        getButton("button2")
            .remove()
        ,
        newHtml("instructions", "instructions.html")
            .print()
        ,
        newButton("button3", "continue")
            .print()
            .wait()
        ,
        getHtml("instructions")
            .remove()
        ,
        getButton("button3")
            .remove()
        ,
        //newText("<p>Instructions</p>")
        //,
        //newText("<p>Please read the instructions below before proceeding.</p>")
        //,
        //newText("<p>You will be presented with a series of sentences, which we ask
    //you to read attentively and carefully. After reading the sentences, you will be 
    //presented with a word.</p>")
        //,
        //newText("<p> Your task is to decide whether the presented word is an 
    //English word or not.</p>")
        //,
        //newText("<p> Press the <strong>A</strong> key to answer 
   // <strong>No</strong>, or the <strong>L</strong> key to answer 
    //<strong>Yes</strong>. When doing so, try to respond as swiftly as possible. 
    //</p>")
        //,
        newHtml("VPInfo", "VPInfo.html")
            .settings.log() // log inputs in html
            .print()
        ,
        newButton("start")
            .print()
            .wait(
              getHtml("VPInfo").test.complete()
                .failure( getHtml("VPInfo").warn() )
            )
    )
    .log( "ID" , getVar("ID") ) // doesn't log by me, I don't know why
    // Main part of the experiment /////////
    PennController.Template(
      variable => PennController(//"experiment",
          newTimer(500)
              .start()
              .wait()
          ,
          newText("Teil1", variable.Teil1)
              .print()
          ,
          newKey(" ")
              .wait()
          ,
          getText("Teil1")
              .remove()
          ,
          newText("Teil2", variable.Teil2)
              .print()
          ,
          newKey(" ")
              .wait()
          ,
          getText("Teil2")
              .remove()
          ,
          newTimer("timer", variable.Time)
              .start()
              .wait()
          ,
          newText("Target", variable.Target)
          ,
          newText("No", "No")
          ,
          newText("Yes", "Yes")
          ,
          newCanvas("LDT", 700, 50) // Should we generally create a canvate for the sentences as well? Some long sentences strech across the whole screen and look 
    //awful...
              .settings.add(330, 0, getText("Target"))
              .settings.add(30, 150, getText("No"))
              .settings.add(650, 150, getText("Yes"))
              .print()
          ,
          newSelector()
              .settings.add(getText("No"), getText("Yes"))
              .settings.keys("A", "L")
              .settings.log()
              .wait()
          ,
          getCanvas("LDT")
              .remove()
          ,
          newText("pleasewait","Please wait until the next trail starts.")
              .print()
          ,
          newTimer("wait", 500)
              .start()
              .wait()
          ,
          getText("pleasewait")
             .remove()
      )
      .log( "ID"     , getVar("ID")    )
      .log( "ItemNum"   ,variable.ItemNum   )
      .log("Prime", variable.Prime)
      .log( "Target" , variable.Target )
      .log( "Group"  , variable.Group )
      .log( "Condition", variable.Condition )
      .log("Time", variable.Time)
    )
    // Experiment completion screen///////
    PennController.SendResults()//"send") // send results before participants seeing the completion screen
    PennController("final",
        newText("<p>This is the end of the experiment. The results were successfully sent to the server. Thank you for your participation!</p>")
            .print()
        ,
        newText("<p>You can close the window now.</p>")
            .print()
        ,
        newButton("void") // create an empty button that makes the screen stay


