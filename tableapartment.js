$('#selectoption').on('input', function() {
     var num = parseInt($(this).val(), 10);
     if(!isNaN(num) && num<201) {
     var container = $('<div class="form-group">');
        for(var i = 1; i <= num; i++) {
         container.append('<label class="control-label"> Option '+i+'<label/>');
         container.append('<input class="form-control" style="margin-bottom:5px;" name="option'+i+'" type="text" placeholder="Enter Option Name" required class="form-control"/>');
        }
     $('#optionsection').html(container);
    }
    else{
        var container = $('<ul></ul>');
        $('#optionsection').html(container);
    }
});

$('#selectblock').on('input', function() {
     var num = parseInt($(this).val(), 10);
     if(!isNaN(num) && num<50) {
     var container = $('<div class="form-group">');
        for(var i = 1; i <= num; i++) {
         container.append('<label class="control-label"> Block '+i+'<label/>');
         container.append('<input class="form-control" style="margin-bottom:5px;" name="block'+i+'" type="text" placeholder="Enter Block Name" class="form-control"/>');
        }
     $('#blocksection').html(container);
    }
    else{
        var container = $('<ul></ul>');
        $('#blocksection').html(container);
    }
});

$('#optionnumbers').keyup(function() {
     var num = parseInt($(this).val(), 10);
     if(!isNaN(num)) {
     var container = $('<div class="form-control" style="width:70%; padding-bottom:20px"/>');
        for(var i = 1; i <= num; i++) {
         container.append('<div class="form-group">');
         container.append('<label> Option '+i+'<label/>');
         container.append('<input name="option'+i+'" type="text" placeholder="Enter Option Name" class="form-control"/>');
         container.append('</div>');
        }
     $('#optionfield').html(container);
    }
    else{
        var container = $('<ul></ul>');
        $('#optionfield').html(container);
    }
});
