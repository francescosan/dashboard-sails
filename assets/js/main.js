$(document).ready(function() {
	$('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
	$('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});

    $("#addSubmitBtn").click(function(e) {
        e.preventDefault(); // prevent page refresh

        $.ajax({
            type: "POST",
            url: $('#createProduct').attr('action'),
            data: $('#createProduct').serialize(),   // serialize form data
            success: function(data) {
				// window.location.replace("?page=pastevents");
				console.log(data);
				if(data && data.indexOf('error') < 0){
					$('#createProduct .succes').css('display','block');
					$('#addModal').on('hidden.bs.modal', function () {
						window.location.reload();
					});
				}else{
					$('#createProduct .error').css('display','block');
				}
            },
            error: function(err) {
				console.log(err);
				$('#createProduct .error').css('display','block');
            }
        });
	});
	
	$('#confirm-delete').on('show.bs.modal', function(e) {
		// $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));

		var itemToDelete = {
			_csrf: $('input[name="_csrf"]').val(),
			id: $(e.relatedTarget).parents('div[data-id]').attr('data-id')
		}
		$('.debug-url').html('Delete URL: <strong>' + JSON.stringify(itemToDelete) + '</strong>');
		$('#confirm-delete .btn-danger.btn-ok').click(function(e) {
			e.preventDefault();

			$.ajax({
				type: "DELETE",
				url: '/delete?_csrf='+itemToDelete._csrf+'&id='+itemToDelete.id,
				success: function(data) {
					console.log(data);
					$('.toast').css('display','block');
					$('.toast').toast('show');
					$('.toast').on('hidden.bs.toast', function () {
						window.location.reload();
					});
				},
				error: function(err) {
					console.log(err);
					$('.toast-body').text(JSON.stringify(err));
					$('.toast').css('display','block');
					$('.toast').toast('show');
				}
			});
	
		});
	});

});