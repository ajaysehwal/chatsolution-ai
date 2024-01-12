import React from "react";
import { Button } from "@/components/ui/button";
import { ManageChat } from "../services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
const DeleteDialog = ({
  open,
  setOpen,
  SettingDialog,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  SettingDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [load, setload] = React.useState<boolean>(false);
  const managechat = new ManageChat();
  const deleting = async () => {
    setload(true);
    const res = await managechat.deleteallchat();
    if (res.status) {
      setOpen(false);
      SettingDialog(false);
      document.location.reload();
    } else {
      throw new Error("unable to delete all chat data");
    }
    setload(false);
  };
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this chat from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => setOpen(false)}
              type="button"
              variant="secondary"
            >
              cancel
            </Button>
          </DialogClose>
          <Button
            disabled={load}
            onClick={() => deleting()}
            type="submit"
            variant="destructive"
          >
            {load ? (
              <div className="flex">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting
              </div>
            ) : (
              "confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default function Setting({
  SettingDialog,
}: {
  SettingDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        SettingDialog={SettingDialog}
      />
      <div className="flex flex-col gap-2">
        <div
          className="flex justify-between p-2"
          style={{ borderBottom: "1px solid silver" }}
        >
          <p>Important Chats</p>
          <Button variant="secondary">View</Button>
        </div>
        <div
          className="flex justify-between p-2"
          style={{ borderBottom: "1px solid silver" }}
        >
          <p>Delete all chats</p>
          <Button variant="destructive" onClick={() => setOpen(true)}>
            Delete all
          </Button>
        </div>
      </div>
    </>
  );
}

