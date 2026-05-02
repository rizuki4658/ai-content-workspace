import { useState } from "react";

import { Link, Pen, X } from "lucide-react";
import { CardDescription, CardTitle } from "../ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const initialAvatarUrl = "https://github.com/shadcn.png"

export default function MySettingsAvatar() {
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl)
  const [avatarInput, setAvatarInput] = useState(initialAvatarUrl)
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)

  const onEditAvatar = () => {
    setAvatarInput(avatarUrl)
    setIsEditingAvatar(true)
  }

  const onCancelAvatar = () => {
    setAvatarInput(avatarUrl)
    setIsEditingAvatar(false)
  }

  const onSaveAvatar = () => {
    const nextAvatarUrl = avatarInput.trim()

    if (!nextAvatarUrl) return

    setAvatarUrl(nextAvatarUrl)
    setIsEditingAvatar(false)
  }

return (<>
    <CardTitle className="pt-4">
      <div className="flex flex-col justify-center items-center">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl} alt="Profile avatar" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>

          <div className="absolute z-10 bottom-0 right-0">
            <Button
              variant="secondary"
              size="icon-xs"
              className="rounded-full"
              type="button"
              onClick={isEditingAvatar ? onCancelAvatar : onEditAvatar}
            >
              {isEditingAvatar ? <X /> : <Pen />}
            </Button>
          </div>
        </div>
      </div>
    </CardTitle>

    <CardDescription>
      {isEditingAvatar ? (
        <div className="flex items-center justify-center mt-2">
          <div className="flex w-full md:max-w-sm items-center gap-2">
            <InputGroup className="flex-1">
              <InputGroupInput
                value={avatarInput}
                placeholder="https://www.example.com/img.png"
                onChange={(event) =>
                  setAvatarInput(event.target.value)
                }
              />
              <InputGroupAddon align="inline-end">
                <Link />
              </InputGroupAddon>
            </InputGroup>

            <Button
              type="button"
              size="sm"
              onClick={onSaveAvatar}
              disabled={!avatarInput.trim()}
            >
              Save
            </Button>
          </div>
        </div>
      ) : null}
    </CardDescription>
  </>)
}