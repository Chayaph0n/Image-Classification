import Swal from 'sweetalert2';

const SuccessAlert = () => {
    Swal.fire(
        'Submitted',
        'Data has been saved.',
        'success'
    );
}

export default SuccessAlert;