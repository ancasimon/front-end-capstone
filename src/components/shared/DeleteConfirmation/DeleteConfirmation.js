import React from 'react';
import Swal from 'sweetalert2';

import './DeleteConfirmation.scss';

const deleteConfirmationMessage = (gearId) => {
  const { gearItem, removeGearItem } = this.props;
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#32471E',
    cancelButtonColor: '#8b0000',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success',
      );
      removeGearItem(gearItem.id);
    }
  });
}

export default { deleteConfirmationMessage };
