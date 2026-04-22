import type { ContentStatus, ContentType } from "@/lib/types/content"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/ui/input-group"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import {
  Search,
  Trash2
} from "lucide-react"

export default function ContentsFilter({
  value,
  status,
  types,
  onChange,
  onClear
}: {
  status: Record<ContentStatus, string>;
  types: Record<ContentType, string>;
  value?: any;
  onChange?: () => void;
  onClear?: () => void;
}) {
  return (
    <div className="flex flex-col md:justify-between md:flex-row items-center w-full gap-4">
      <div className="flex-1 w-full">
        <InputGroup className="w-full md:max-w-md">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>
      </div>

      <div className="flex-1 w-full flex items-center justify-end gap-2">
        <div className="grid grid-cols-3 gap-2 w-full flex-1 md:max-w-125">
          <Select>
            <SelectTrigger
              id="content-status"
              className="w-full rounded-sm">
              <span className="truncate text-left">
                <SelectValue placeholder="Status" />
              </span>
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-sm">
              <SelectContent position="popper" className="rounded-sm">
                {(Object.keys(status) as Array<keyof typeof status>).map((key) => (
                  <SelectItem key={key} value={key}>
                    {status[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger
              id="content-type"
              className="w-full rounded-sm">
              <span className="truncate text-left">
                <SelectValue placeholder="Type" />
              </span>
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-sm">
              {(Object.keys(types) as Array<keyof typeof types>).map((key) => (
                <SelectItem key={key} value={key}>
                  {types[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger
              id="content-sort"
              className="w-full rounded-sm">
              <span className="truncate text-left">
                <SelectValue placeholder="Sort" />
              </span>
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-sm">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="recently_updated">Recently Updated</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-7">
          <Button
            variant="destructive"
            size="icon-sm"
            className="text-destructive">
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  )
}