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
            var $removeBtn = $('<button>Remove</button>');
            $removeBtn.click(function () {
                $inputHolder.remove();
            });

            var $editBtn = $('<button>Edit</button>')

            if (controlType == 'textarea') {
                if (editControlId) {
                    $('#lab-' + editControlId).text($('#textAreaLabel').val() + ':');
                    editControlId = null;
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
                    editControlId = null;
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
                var labelText = $('#addSelLabel').val();

                var optionCount = $('.selectControls .options').size();

                var generateOptions = function (selectId) {
                    $('.options').each(function () {
                        selectText = $(this).find('#selectFieldText').val();
                        selectWeight = $(this).find('#selectFieldWeight').val();
                        $('#' + selectId).append($("<option></option>")
                            .attr('value', 'o' + i)
                            .attr('weight', selectWeight)
                            .attr('optionId', i)
                            .text(selectText));
                    });
                };

                if (editControlId) {
                    $('#lab-' + editControlId).text(labelText + ':');
                    $('#' + editControlId).empty();
                    generateOptions(editControlId);
                    editControlId = null;

                } else {
                    selectfieldCounter = selectfieldCounter + 1;
                    totalControls = inputFieldCounter + selectfieldCounter + textAreaCounter + radioCounter + cboxCounter;
                    var selectId = 'select-' + totalControls;
                    $('.controlsHolder').append('<div class="selectField" id=control-' + totalControls + ' ></div>');
                    $inputHolder = $('#control-' + totalControls);
                    var selectText, selectWeight;
                    $inputHolder.append('<label for=' + selectId + ' id="lab-' + selectId + '" >' + labelText + ': </label>');
                    $inputHolder.append('<select id=' + selectId + ' name=' + selectId + '>');
                    generateOptions(selectId);
                    $inputHolder.append($removeBtn);
                    $inputHolder.append($editBtn);
                    $editBtn.click(function () {
                        hideCreationControls();
                        $('#getSelect').click();
                        $('#addSelLabel').val(labelText);
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
                radioCounter = radioCounter + 1;
                totalControls = inputFieldCounter + selectfieldCounter + textAreaCounter + radioCounter + cboxCounter;
                var radioId = 'radio-' + totalControls;
                $('.controlsHolder').append('<div class="radioField" id=control-' + totalControls + ' ></div>');
                $inputHolder = $('#control-' + totalControls),
                    radioText, radioWeight;
                $inputHolder.append('<label for=' + radioId + ' id="lab-mq-' + radioId + '" >' + $('#addRadioLabel').val() + ': </label>');
                for (var i = 1; i <= optionCounter; i++) {
                    brojOdg = i;
                    radioText = $('#option' + i + ' #radioFieldText').val();
                    radioWeight = $('#option' + i + ' #radioFieldWeight').val();
                    $inputHolder.append('<input id=odg' + brojOdg + ' name=' + brojOdg + ' type="radio" weight="' + radioWeight + '" value="o' + brojOdg + '">');
                    $inputHolder.append('<label for=odg' + brojOdg + ' id="lab-' + brojOdg + '" >' + radioText + '</label>');
                }
                optionCounter = 0;
                $('.options').remove();
            }


            if (controlType == 'checkbox') {
                cboxCounter = cboxCounter + 1;
                totalControls = inputFieldCounter + selectfieldCounter + textAreaCounter + radioCounter + cboxCounter;
                var cboxId = 'cbox-' + cboxCounter;
                $('.controlsHolder').append('<div class="cboxField" id=control-' + totalControls + ' ></div>');
                $inputHolder = $('#control-' + totalControls),
                    cboxText, cboxWeight;
                $inputHolder.append('<label for=' + cboxId + ' id="lab-mq-' + cboxId + '" >' + $('#addCboxLabel').val() + ': </label>');
                for (var i = 1; i <= optionCounter; i++) {
                    brojOdg = i;
                    cboxText = $('#option' + i + ' #cboxFieldText').val();
                    cboxWeight = $('#option' + i + ' #cboxFieldWeight').val();
                    $inputHolder.append('<input id=' + brojOdg + ' name=' + brojOdg + ' type="checkbox" weight="' + cboxWeight + '" value="o' + brojOdg + '">');
                    $inputHolder.append('<label for=' + brojOdg + ' id="lab-' + brojOdg + '" >' + cboxText + '</label>');
                }
                optionCounter = 0;
                $('.options').remove();
            }


            hideCreationControls();
        }
    });

    function hideCreationControls() {
        $('.selectControls,.inputControls, .textAreaControls, .radioControls, .cboxControls').hide();
        $('.options').remove();
        $('.getButtons').fadeIn();
    }

//switch kod cancela
    $('#btnCancel').click(function () {
        $('.selectControls,.inputControls, .textAreaControls, .radioControls, .cboxControls').hide();
        $('.getButtons').fadeIn();
        optionCounter = 0;
        $('.options').remove();
    });
});