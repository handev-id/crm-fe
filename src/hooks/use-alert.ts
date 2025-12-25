import Swal from "sweetalert2";

const PRIMARY_COLOR = "oklch(0.6779 0.1797 247.3519)";

export default function useConfirm() {
  const confirm = async ({
    title = "Are you sure?",
    text = "This action cannot be undone.",
    confirmText = "Yes",
    cancelText = "Cancel",
  }: {
    title?: string;
    text?: string;
    confirmText?: string;
    cancelText?: string;
  } = {}) => {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,

      // 🎨 custom color
      confirmButtonColor: PRIMARY_COLOR,
      cancelButtonColor: "#e5e7eb", // neutral gray

      // UX
      focusCancel: true,
    });

    return result.isConfirmed;
  };

  return confirm;
}
