// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
// import { ImageIcon, MoreHorizontal, Paperclip, Smile } from "lucide-react";

// export default function ConversationRoom() {
//     return (
//       <div className="flex-1 flex flex-col bg-white">
//         {/* Chat Header */}
//         <div className="p-4 border-b flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Avatar>
//               <AvatarImage src={selectedConversation.contact.avatar?.url} />
//               <AvatarFallback>
//                 {selectedConversation.contact.firstName[0]}
//                 {selectedConversation.contact.lastName[0]}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <div className="flex items-center gap-2">
//                 <h2 className="font-semibold">
//                   {selectedConversation.contact.firstName}{" "}
//                   {selectedConversation.contact.lastName}
//                 </h2>
//                 <span className="text-sm text-gray-500">Acme Inc</span>
//               </div>
//               <div className="text-xs text-gray-500">
//                 📘 Facebook Messenger • Zapier
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <Button variant="ghost" size="icon">
//               <Star className="h-5 w-5" />
//             </Button>
//             <Button variant="ghost" size="icon">
//               <MoreHorizontal className="h-5 w-5" />
//             </Button>
//             <Button
//               variant="default"
//               className="bg-[oklch(0.6779_0.1797_247.3519)]"
//             >
//               <Clock className="h-4 w-4 mr-2" />
//               Snooze
//             </Button>
//             <Button
//               variant="default"
//               className="bg-[oklch(0.6779_0.1797_247.3519)]"
//               onClick={() => setIsDetailsOpen(!isDetailsOpen)}
//             >
//               Close
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => setIsDetailsOpen(!isDetailsOpen)}
//             >
//               Details
//             </Button>
//           </div>
//         </div>

//         {/* Messages */}
//         <ScrollArea className="flex-1 p-4">
//           <div className="max-w-3xl mx-auto space-y-4">
//             {messages.map((msg) => (
//               <div key={msg.id} className="flex gap-3">
//                 {msg.isAgent ? (
//                   <>
//                     <Avatar className="h-8 w-8">
//                       <AvatarFallback className="bg-[oklch(0.6779_0.1797_247.3519)] text-white">
//                         R
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1">
//                       <Card className="p-3 bg-gray-50">
//                         <p className="text-sm">{msg.text}</p>
//                       </Card>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className="text-xs text-gray-500">
//                           {msg.time}
//                         </span>
//                         {msg.isLast && (
//                           <span className="text-xs text-gray-400">
//                             Not seen
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <Avatar className="h-8 w-8">
//                       <AvatarImage
//                         src={selectedConversation.contact.avatar?.url}
//                       />
//                       <AvatarFallback>
//                         {selectedConversation.contact.firstName[0]}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1">
//                       <Card className="p-3 bg-white border">
//                         <p className="text-sm">{msg.text}</p>
//                       </Card>
//                       <span className="text-xs text-gray-500 mt-1 block">
//                         {msg.time}
//                       </span>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </ScrollArea>

//         {/* Input Area */}
//         <div className="p-4 border-t">
//           <div className="max-w-3xl mx-auto">
//             <div className="flex items-center gap-2 mb-2">
//               <Button variant="ghost" size="sm" className="h-8">
//                 <MessageSquare className="h-4 w-4 mr-2" />
//                 Reply via Messenger
//                 <ChevronDown className="h-4 w-4 ml-2" />
//               </Button>
//             </div>

//             <div className="flex items-end gap-2 border rounded-lg p-2">
//               <div className="flex gap-1">
//                 <Button variant="ghost" size="icon" className="h-8 w-8">
//                   <Paperclip className="h-4 w-4" />
//                 </Button>
//                 <Button variant="ghost" size="icon" className="h-8 w-8">
//                   <ImageIcon className="h-4 w-4" />
//                 </Button>
//                 <Button variant="ghost" size="icon" className="h-8 w-8">
//                   <Smile className="h-4 w-4" />
//                 </Button>
//               </div>

//               <Input
//                 placeholder="Write a message..."
//                 className="border-0 focus-visible:ring-0 flex-1"
//               />

//               <div className="flex gap-1">
//                 <Button variant="ghost" size="icon" className="h-8 w-8">
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             <div className="flex justify-between items-center mt-2">
//               <div className="text-xs text-gray-500">Send and close</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// }
