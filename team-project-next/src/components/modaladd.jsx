import { Button } from "@mui/material";

export default function Modaladdquestions({ onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>Are you sure?</p>
        <div className="btn-modal">
          <Button variant="outlined" onClick={onClose}>CANCEL</Button>
          <Button variant="contained" onClick={onConfirm}>YES</Button>
        </div>
      </div>
    </div>
  );
}
