import Swal from 'sweetalert2';

const MakeSureAlert = () => {
    return Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to submit data?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#512DA8',
        cancelButtonColor: '#FC0456',
        confirmButtonText: 'Submit'
    })
}

export default MakeSureAlert;