import Swal from 'sweetalert2';

const ErrorAlert = ({ title, text }) => {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
    });
}

export default ErrorAlert;