import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, X } from "lucide-react";

interface Props {
  setIsDetailsOpen: (isOpen: boolean) => void;
}

export default function ConversationDetail({ setIsDetailsOpen }: Props) {
  return (
    <div className="w-80 bg-white border-l overflow-y-auto">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Details</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDetailsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Conversation Attributes */}
        <div>
          <h4 className="font-semibold mb-3 text-sm">
            Conversation attributes
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Stage</span>
              <Badge variant="secondary">Opening</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Team</span>
              <span>Customer Success</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Assignee</span>
              <span>Rose Le</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Follower</span>
              <span>Mel Pham</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Topic</span>
              <span>Managing my business</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subject</span>
              <span className="text-right">
                Why is my business information being requested again?
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ID</span>
              <span>#1912202100</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact Attributes */}
        <div>
          <h4 className="font-semibold mb-3 text-sm">Contact attributes</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name</span>
              <span>Dorothy Ng</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Company</span>
              <span>Acme Inc</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span>dorothy@email.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Work phone</span>
              <span>+493015009720</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lifecycle stage</span>
              <span>Customer</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <Badge className="bg-green-100 text-green-800">Premium</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Owner</span>
              <span>Rose Le</span>
            </div>
          </div>

          <Button variant="link" className="mt-2 p-0 h-auto text-sm">
            More details
          </Button>
        </div>

        <Separator />

        {/* Contact Tags */}
        <div>
          <h4 className="font-semibold mb-3 text-sm">Contact tags</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Grow plan</Badge>
            <Badge variant="outline">Potential upgrade</Badge>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Qualifications */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-sm">Qualifications</h4>
            <span className="text-sm text-green-600">0/0 Completed</span>
          </div>
        </div>

        <Separator />

        {/* Linked Tickets */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-sm">Linked tickets</h4>
            <Badge variant="secondary">1</Badge>
          </div>
        </div>

        <Separator />

        {/* Recent Conversations */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-sm">
              Recent conversations & tickets
            </h4>
            <Badge variant="secondary">2</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
