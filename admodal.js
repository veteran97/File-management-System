
$('#admodal').on('show.bs.modal', function(e) {
        var $modal = $(this)
        var adId = e.relatedTarget.id;
        var adimage = $(e.relatedTarget).data('imageurl');
        var adtitle = $(e.relatedTarget).data('title');
        var adcredit = $(e.relatedTarget).data('credits')

        //$modal.find('.edit-content').html(adI);
        $modal.find('#ad-heading').html(adId);
        $modal.find('#ad-image').attr('src', adimage);
        $modal.find('#ad-title').html(adtitle);
        $modal.find('#ad-credit').html(adcredit);
});