import { PopupOverlay, CommentPopup } from "@/lib/components";

interface Props {
  params: {
    id: string;
  };
}

export default function CommentPage({ params }: Props) {
    const { id } = params;

    return (
       <PopupOverlay>
            <CommentPopup />
       </PopupOverlay>
    )
}
