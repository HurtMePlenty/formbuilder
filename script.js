$(document).ready(function () {

    var controlType = '', inputFieldCounter = 0, textAreaCounter = 0, radioCounter = 0, cboxCounter = 0, selectfieldCounter = 0, totalControls = 0, optionCounter = 0;
    var editControlId = null;
//prikupljanje vrijednosti za text polje
    $('#getTextarea').click(function () {
        controlType = 'textarea';
        $('#textAreaLabel').val('');
        $('.selectControls,.getButtons').hide();
        $('.textAreaControls').fadeIn();

    }); // text polje


//prikupljanje vrijednosti za input polje
    $('#getTextbox').click(function () {
        controlType = 'input';
        $('#inputVal').val('');
        $('.selectControls,.getButtons').hide();
        $('.inputControls').fadeIn();
    }); // input polje

//prikupljanje vrijednosti za select polje
    $('#getSelect').click(function () {
        controlType = 'select';
        $('.inputControls,.getButtons').hide();
        $('.selectControls input[type="text"]').val('');
        $('.selectControls').fadeIn();
        generateOptions();
    });


//prikupljanje vrijednosti za radio polje
    $('#getRadio').click(function () {
        controlType = 'radio';
        $('.inputControls,.getButtons').hide();
        $('.radioControls input[type="text"]').val('');
        $('.radioControls').fadeIn();
        generateRadioOptions();
    });
// dodavanje opcije
    $('#btnAddRadio').click(function () {
        generateRadioOptions();
    });
    function generateRadioOptions() {
        optionCounter = optionCounter + 1;
        var id = 'option' + optionCounter;
        $('.radioControls .optionsHolder').append('<div class="options" id=' + id + '></div>');
        var $optionHolder = $('#' + id);
        $optionHolder.append('<div class="optionHeading"><label>Odgovor: ' + optionCounter + '</label></div>');
        $optionHolder.append('<label>Tekst odgovora:</label>');
        $optionHolder.append('<input type="text" id="radioFieldText" />');
        $optionHolder.append('<label>Težina odgovora:</label>');
        $optionHolder.append('<input type="text" id="radioFieldWeight" />');
    }

    $('#btnDelRadio').click(function () {
        if (optionCounter > 1) {
            $('#option' + optionCounter).remove();
            optionCounter = optionCounter - 1;
        }
    });


//prikupljanje vrijednosti za checkbox
    $('#getCbox').click(function () {
        controlType = 'checkbox';
        $('.inputControls,.getButtons').hide();
        $('.cboxControls input[type="text"]').val('');
        $('.cboxControls').fadeIn();
        generateCboxOptions();
    });
// dodavanje opcije
    $('#btnAddCbox').click(function () {
        generateCboxOptions();
    });
    function generateCboxOptions() {
        optionCounter = optionCounter + 1;
        var id = 'option' + optionCounter;
        $('.cboxControls .optionsHolder').append('<div class="options" id=' + id + '></div>');
        var $optionHolder = $('#' + id);
        $optionHolder.append('<div class="optionHeading"><label>Odgovor: ' + optionCounter + '</label></div>');
        $optionHolder.append('<label>Tekst odgovora:</label>');
        $optionHolder.append('<input type="text" id="cboxFieldText" />');
        $optionHolder.append('<label>Težina odgovora:</label>');
        $optionHolder.append('<input type="text" id="cboxFieldWeight" />');
    }

    $('#btnDelCbox').click(function () {
        if (optionCounter > 1) {
            $('#option' + optionCounter).remove();
            optionCounter = optionCounter - 1;
        }
    });


// dodavanje opcije
    $('#btnAddOption').click(function () {
        generateOptions();
    });
    function generateOptions() {
        optionCounter = optionCounter + 1;
        var id = 'option' + optionCounter;
        $('.selectControls .optionsHolder').append('<div class="options" id=' + id + '></div>');
        var $optionHolder = $('#' + id);
        $optionHolder.append('<div class="optionHeading"><label>Odgovor: ' + optionCounter + '</label></div>');
        $optionHolder.append('<label>Tekst odgovora:</label>');
        $optionHolder.append('<input type="text" id="selectFieldText" />');
        $optionHolder.append('<label>Težina odgovora:</label>');
        $optionHolder.append('<input type="text" id="selectFieldWeight" />');
    }

//brisanje opcija iz selecta
    $('#btnDelOption').click(function () {
        if (optionCounter > 1) {
            $('#option' + optionCounter).remove();
            optionCounter = optionCounter - 1;
        }
    });

//dodavanje input fielda u formu
    $('#btnSave').click(function () {
        if ($('.getButtons').css('display') === 'none') {

            var $inputHolder;
            var $removeBtn = $('<button class="removeBtn">Remove</button>');
            $removeBtn.click(function () {
                $inputHolder.remove();
            });

            var $editBtn = $('<button class="editBtn">Edit</button>')

            if (controlType == 'textarea') {
                if (editControlId) {
                    $('#lab-' + editControlId).text($('#textAreaLabel').val() + ':');
                } else {
                    textAreaCounter = textAreaCounter + 1;
                    totalControls = inputFieldCounter + selectfieldCounter + textAreaCounter + radioCounter + cboxCounter;
                    var id = 'textarea-' + totalControls;
                    $('.controlsHolder').append('<div class="textAreaField" id="control-' + totalControls + '" ></div>');
                    $inputHolder = $('#control-' + totalControls);

                    $inputHolder.append('<label for=' + id + ' id="lab-' + id + '">' + $('#textAreaLabel').val() + ': </label>');
                    $inputHolder.append('<textarea id=' + id + ' name=' + id + ' /> </textarea>');
                    $inputHolder.append($removeBtn);
                    $inputHolder.append($editBtn);

                    $editBtn.click(function () {
                        hideCreationControls();
                        $('#getTextarea').click();
                        $('#textAreaLabel').val($('#lab-' + id).text().trim().slice(0, -1));
                        editControlId = id;
                    });
                }
            }

            if (controlType == 'input') {

                var selectVal = $('#inputType').val();

                if (selectVal == '1') {
                    type = 'text';
                }
                else if (selectVal == '2') {
                    type = 'number';
                }
                else if (selectVal == '3') {
                    type = 'email';
                }

                if (editControlId) {
                    $('#lab-' + editControlId).text($('#inputVal').val() + ':');
                    $('#' + editControlId).attr('type', type);
                    $('#' + editControlId).attr('optionId', selectVal);
                } else {
                    inputFieldCounter = inputFieldCounter + 1;
                    totalControls = inputFieldCounter + selectfieldCounter + textAreaCounter + radioCounter + cboxCounter;
                    var id = 'input-' + totalControls;
                    $('.controlsHolder').append('<div class="inputField" id="control-' + totalControls + '" ></div>');
                    $inputHolder = $('#control-' + totalControls);


                    $inputHolder.append('<label for=' + id + ' id="lab-' + id + '">' + $('#inputVal').val() + ': </label>');
                    $inputHolder.append('<input optionId="' + selectVal + '" type="' + type + '" value="" id=' + id + ' name=' + id + ' />')

                    $inputHolder.append($removeBtn);
                    $inputHolder.append($editBtn);

                    $editBtn.click(function () {
                        hideCreationControls();
                        $('#getTextbox').click();
                        $('#inputVal').val($('#lab-' + id).text().trim().slice(0, -1));
                        $('#inputType').val($('#' + id).attr('optionId'));
                        editControlId = id;
                    });
                }
            }

            //dodavanje select boxa u formu
            if (controlType == 'select') {
                var i = 0;
                var generateOptions = function (selectId) {
                    $('.options').each(function () {
                        selectText = $(this).find('#selectFieldText').val();
                        selectWeight = $(this).find('#selectFieldWeight').val();
                        $('#' + selectId).append($("<option></option>")
                            .attr('value', 'o' + i)
                            .attr('weight', selectWeight)
                            .attr('optionId', i)
                            .text(selectText));
                        i++;
                    });
                };

                if (editControlId) {
                    $('#lab-' + editControlId).text($('#addSelLabel').val() + ':');
                    $('#' + editControlId).empty();
                    generateOptions(editControlId);

                } else {
                    selectfieldCounter = selectfieldCounter + 1;
                    totalControls = inputFieldCounter + selectfieldCounter + textAreaCounter + radioCounter + cboxCounter;
                    var selectId = 'select-' + totalControls;
                    $('.controlsHolder').append('<div class="selectField" id=control-' + totalControls + ' ></div>');
                    $inputHolder = $('#control-' + totalControls);
                    var selectText, selectWeight;
                    $inputHolder.append('<label for=' + selectId + ' id="lab-' + selectId + '" >' + $('#addSelLabel').val() + ': </label>');
                    $inputHolder.append('<select id=' + selectId + ' name=' + selectId + '>');
                    generateOptions(selectId);
                    $inputHolder.append($removeBtn);
                    $inputHolder.append($editBtn);
                    $editBtn.click(function () {
                        hideCreationControls();
                        $('#getSelect').click();
                        $('#addSelLabel').val($('#lab-' + selectId).text().trim().slice(0, -1));
                        var first = true;
                        $('#' + selectId + ' option').each(function () {
                            var $option = $(this);
                            if (first) {
                                first = false;
                            } else {
                                $('#btnAddOption').click();
                            }
                            $('.selectControls #selectFieldText').last().val($option.text());
                            $('.selectControls #selectFieldWeight').last().val($option.attr('weight'));
                        });

                        editControlId = selectId;
                    });
                }

            }


            if (controlType == 'radio') {
                var radioText, radioWeight;
                var generateRadioContent = function ($label) {
                    var $lastElem = $label;
                    for (var i = 1; i <= optionCounter; i++) {
                        brojOdg = i;
                        radioText = $('#option' + i + ' #radioFieldText').val();
                        radioWeight = $('#option' + i + ' #radioFieldWeight').val();
                        var $lbl = $('<label for=odg' + brojOdg + ' id="lab-' + brojOdg + '" >' + radioText + '</label>');
                        var $input = $('<input id=odg' + brojOdg + ' name=' + brojOdg + ' type="radio" weight="' + radioWeight + '" value="o' + brojOdg + '">');
                        var $removeRadioBtn = $('<button class="removeRadio">-</button>');

                        +function () {
                            var lblRef = $lbl;
                            var inputRef = $input;
                            var removeRadioBtnRef = $removeRadioBtn;
                            $removeRadioBtn.click(function () {
                                lblRef.remove();
                                inputRef.remove();
                                removeRadioBtnRef.remove();
                            });
                        }();
                        $lastElem.after($input);
                        $input.after($lbl);
                        $lbl.after($removeRadioBtn);
                        $lastElem = $removeRadioBtn;

                    }

                }
                if (editControlId) {
                    var $label = $('#lab-mq-' + editControlId);
                    $label.text($('#addRadioLabel').val() + ':');
                    var $wrapper = $label.parent();

                    $wrapper.find('input').each(function () {
                        $(this).next().remove();
                        $(this).remove();
                    });

                    $wrapper.find('.removeRadio').remove();

                    generateRadioContent($label);

                }
                else {
                    radioCounter = radioCounter + 1;
                    totalControls = inputFieldCounter + selectfieldCounter + textAreaCounter + radioCounter + cboxCounter;
                    var radioId = 'radio-' + totalControls;
                    $('.controlsHolder').append('<div class="radioField" id=control-' + totalControls + ' ></div>');
                    $inputHolder = $('#control-' + totalControls);

                    var $controlLabel = $('<label for=' + radioId + ' id="lab-mq-' + radioId + '" >' + $('#addRadioLabel').val() + ': </label>');
                    $inputHolder.append($controlLabel);

                    generateRadioContent($controlLabel);

                    $inputHolder.append($removeBtn);
                    $inputHolder.append($editBtn);

                    $editBtn.click(function () {
                        hideCreationControls();
                        $('#getRadio').click();
                        $('#addRadioLabel').val($('#lab-mq-' + radioId).text().trim().slice(0, -1));
                        var first = true;
                        $('#lab-mq-' + radioId).parent().find('input').each(function () {
                            if (first) {
                                first = false;
                            } else {
                                $('#btnAddRadio').click();
                            }

                            var $radio = $(this);
                            var $label = $radio.next();
                            $('.radioControls #radioFieldText').last().val($label.text());
                            $('.radioControls #radioFieldWeight').last().val($radio.attr('weight'));
                        });
                        editControlId = radioId;
                    });
                }
            }


            if (controlType == 'checkbox') {

                var generateCheckboxContent = function ($label) {
                    var $lastElem = $label;
                    for (var i = 1; i <= optionCounter; i++) {
                        brojOdg = i;
                        cboxText = $('#option' + i + ' #cboxFieldText').val();
                        cboxWeight = $('#option' + i + ' #cboxFieldWeight').val();
                        var $input = $('<input id=' + brojOdg + ' name=' + brojOdg + ' type="checkbox" weight="' + cboxWeight + '" value="o' + brojOdg + '">');
                        var $lbl = $('<label for=' + brojOdg + ' id="lab-' + brojOdg + '" >' + cboxText + '</label>');

                        var $removeCboxBtn = $('<button class="removeCbox">-</button>');

                        +function () {
                            var lblRef = $lbl;
                            var inputRef = $input;
                            var removeCboxBtnRef = $removeCboxBtn;
                            $removeCboxBtn.click(function () {
                                lblRef.remove();
                                inputRef.remove();
                                removeCboxBtnRef.remove();
                            });
                        }();

                        $lastElem.after($input);
                        $input.after($lbl);
                        $lbl.after($removeCboxBtn);
                        $lastElem = $removeCboxBtn;
                    }
                };

                if (editControlId) {
                    var $label = $('#lab-mq-' + editControlId);
                    $label.text($('#addCboxLabel').val() + ':');

                    var $wrapper = $label.parent();

                    $wrapper.find('input').each(function () {
                        $(this).next().remove();
                        $(this).remove();
                    });

                    $wrapper.find('.removeCbox').remove();

                    generateCheckboxContent($label);

                } else {
                    cboxCounter = cboxCounter + 1;
                    totalControls = inputFieldCounter + selectfieldCounter + textAreaCounter + radioCounter + cboxCounter;
                    var cboxId = 'cbox-' + cboxCounter;
                    $('.controlsHolder').append('<div class="cboxField" id=control-' + totalControls + ' ></div>');
                    $inputHolder = $('#control-' + totalControls);
                    var cboxText, cboxWeight;
                    var $controlLabel = $('<label for=' + cboxId + ' id="lab-mq-' + cboxId + '" >' + $('#addCboxLabel').val() + ': </label>');
                    $inputHolder.append($controlLabel);
                    generateCheckboxContent($controlLabel);


                    $inputHolder.append($removeBtn);
                    $inputHolder.append($editBtn);
                    $editBtn.click(function () {
                        hideCreationControls();
                        $('#getCbox').click();
                        $('#addCboxLabel').val($('#lab-mq-' + cboxId).text().trim().slice(0, -1));

                        var first = true;
                        $('#lab-mq-' + cboxId).parent().find('input').each(function () {
                            if (first) {
                                first = false;
                            } else {
                                $('#btnAddCbox').click();
                            }

                            var $cbox = $(this);
                            var $label = $cbox.next();
                            $('.cboxControls #cboxFieldText').last().val($label.text());
                            $('.cboxControls #cboxFieldWeight').last().val($cbox.attr('weight'));
                        });

                        editControlId = cboxId;
                    });
                }
            }


            hideCreationControls();
        }
    });

    function hideCreationControls() {
        $('.selectControls,.inputControls, .textAreaControls, .radioControls, .cboxControls').hide();
        $('.options').remove();
        $('.getButtons').fadeIn();
        editControlId = null;
        optionCounter = 0;
    }

//switch kod cancela
    $('#btnCancel').click(function () {
        hideCreationControls();
    });
});