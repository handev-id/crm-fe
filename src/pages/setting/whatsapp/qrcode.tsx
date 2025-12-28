import { useApi } from "@/api/api";
import {
  EventType,
  whatsappCheckStatusApi,
  whatsappLogoutApi,
  whatsappRestartApi,
} from "@/api/endpoints/whatsapp";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import useModal from "@/hooks/use-modal";
import useSocket from "@/hooks/use-socket";
import { QrCode, Download, Copy, Check, Power, RefreshCcw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  whatsappId: string;
  refetchDevices?: () => void;
  status: EventType["status"]["connection"];
}

export default function SettingWhatsappQrCode({
  whatsappId,
  refetchDevices,
  status: initialStatus,
}: Props) {
  const qrCodeModal = useModal();
  const socket = useSocket((state) => state.socket);
  const [copied, setCopied] = useState(false);
  const [event, setEvent] = useState<EventType | null>(null);

  const status = useApi({
    api: whatsappCheckStatusApi,
    onSuccess: (res) => {
      setEvent(res);
    },
  });

  const restart = useApi({
    api: whatsappRestartApi,
    onSuccess: () => {
      toast.success("WhatsApp restarted");
    },
  });

  const logout = useApi({
    api: whatsappLogoutApi,
    onSuccess: () => {
      toast.success("Logged out successfully");
      status.process(whatsappId);
    },
  });

  useEffect(() => {
    if (
      !qrCodeModal.open ||
      !whatsappId ||
      !socket ||
      initialStatus === "CONNECTED"
    )
      return;

    status.process(whatsappId);

    socket.emit("join-wa", whatsappId);

    socket.on("connection-status", (data: EventType) => {
      setEvent(data);
    });

    return () => {
      socket.emit("leave-wa", whatsappId);
    };
  }, [qrCodeModal.open, whatsappId, socket, initialStatus]);

  useEffect(() => {
    if (!refetchDevices) return;

    if (
      (event?.status.connection === "CONNECTED" ||
        event?.status.connection === "DISCONNECTED") &&
      !qrCodeModal.open
    ) {
      refetchDevices();
    }
  }, [event?.status.connection, qrCodeModal.open]);

  const handleDownload = () => {
    const svg = document.getElementById("whatsapp-qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `whatsapp-qr-${whatsappId}.png`;
      link.href = pngFile;
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(whatsappId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const connection = event?.status.connection;

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        onClick={() => qrCodeModal.setOpen(true)}
      >
        <QrCode className="h-4 w-4" />
      </Button>

      <Modal
        modal={qrCodeModal}
        title="WhatsApp Connection"
        description="Manage WhatsApp device connection"
      >
        <div className="flex flex-col items-center space-y-6 py-4 w-full">
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-xl border w-full flex justify-center">
            {(connection === "CONNECTED" || initialStatus === "CONNECTED") && (
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-green-600 font-semibold">Device Connected</p>
                <p className="text-sm text-gray-500">
                  This WhatsApp device is already linked
                </p>
              </div>
            )}

            {connection !== "CONNECTED" && event?.status.qr && (
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <QRCodeSVG
                  id="whatsapp-qr-code"
                  value={event.status.qr}
                  size={200}
                  level="H"
                  includeMargin
                />
              </div>
            )}

            {event?.status?.connection === "CONNECTING" &&
              !event?.status?.qr && (
                <div className="flex flex-col items-center gap-3 py-6">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-green-500" />
                  <p className="text-sm text-gray-500">Loading status...</p>
                </div>
              )}
          </div>

          <div className="w-full bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-1">WhatsApp ID</p>
                <p className="text-sm font-mono truncate">{whatsappId}</p>
              </div>
              <Button size="icon" variant="link" onClick={handleCopy}>
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-green-600" />
                )}
              </Button>
            </div>
          </div>

          {connection !== "CONNECTED" && (
            <div className="w-full space-y-2 text-sm text-gray-600">
              <p className="font-medium text-gray-700">How to connect:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Open WhatsApp on your phone</li>
                <li>Go to Linked Devices</li>
                <li>Scan the QR code shown above</li>
              </ol>
            </div>
          )}

          <div className="w-full flex gap-2">
            {connection !== "CONNECTED" && event?.status.qr && (
              <Button
                onClick={handleDownload}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                <Download className="h-4 w-4" />
                Download QR
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => restart.process(whatsappId)}
              disabled={restart.isLoading}
            >
              <RefreshCcw className="h-4 w-4" />
              Restart
            </Button>

            {/* <Button
              variant="destructive"
              onClick={() => logout.process(whatsappId)}
              disabled={logout.isLoading}
            >
              <Power className="h-4 w-4" />
              Logout
            </Button> */}
          </div>
        </div>
      </Modal>
    </>
  );
}
