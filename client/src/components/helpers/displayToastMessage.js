import { toast } from "react-semantic-toasts";

export default function displayToastMessage(type, icon, description) {
  toast({
    type: type,
    icon: icon,
    description: description,
    animation: "fade left",
    time: 2000
  });
}
