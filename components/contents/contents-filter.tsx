import type { ContentStatus, ContentType, ContentFilter } from "@/lib/types/content"

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
  types,
  status,
  onChange,
  onClear
}: {
  types: Record<ContentType, string>;
  status: Record<ContentStatus, string>;
  value?: ContentFilter;
  onChange?: (value: ContentFilter) => void;
  onClear?: () => void;
}) {
  const onByChange = (e: string) => {
    onChange && onChange({...value, by: e})
  }
  const onTypeChange = (e: ContentType) => {
    onChange && onChange({...value, type: e })
  }
  const onStatusChange = (e: ContentStatus) => {
    onChange && onChange({...value, status: e})
  }
  const onSearchChange = (e: any) => {
    onChange && onChange({...value, search: e?.target?.value})
  }

  return (
    <div className="flex flex-col md:justify-between md:flex-row items-center w-full gap-4">
      <div className="flex-1 w-full">
        <InputGroup className="w-full md:max-w-md">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            value={value?.search}
            placeholder="Search..."
            onInput={onSearchChange}
          />
        </InputGroup>
      </div>

      <div className="flex-1 w-full flex items-center justify-end gap-2">
        <div className="grid grid-cols-3 gap-2 w-full flex-1 md:max-w-125">
          <Select
            value={value?.status}
            onValueChange={onStatusChange}>
            <SelectTrigger
              id="content-status"
              className="w-full rounded-sm">
              <span className={`truncate text-left ${value?.status === 'all' ? 'opacity-50' : ''}`}>
                <SelectValue placeholder="Status" />
              </span>
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-sm">
              <SelectContent position="popper" className="rounded-sm">
                <SelectItem value="all" className="opacity-50">Status</SelectItem>
                {(Object.keys(status) as Array<keyof typeof status>).map((key) => (
                  <SelectItem key={key} value={key}>
                    {status[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectContent>
          </Select>

          <Select
            value={value?.type}
            onValueChange={onTypeChange}>
            <SelectTrigger
              id="content-type"
              className="w-full rounded-sm">
              <span className={`truncate text-left ${value?.type === 'all' ? 'opacity-50' : ''}`}>
                <SelectValue placeholder="Type" />
              </span>
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-sm">
              <SelectItem value="all" className="opacity-50">Type</SelectItem>
              {(Object.keys(types) as Array<keyof typeof types>).map((key) => (
                <SelectItem key={key} value={key}>
                  {types[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={value?.by}
            onValueChange={onByChange}>
            <SelectTrigger
              id="content-sort"
              className="w-full rounded-sm">
              <span className={`truncate text-left ${value?.by === 'all' ? 'opacity-50' : ''}`}>
                <SelectValue placeholder="Sort" />
              </span>
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-sm">
              <SelectItem value="all" className="opacity-50">Sort</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="recently_updated">Recently Updated</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {value?.search || value?.status && value?.status !== 'all' || value?.type && value?.type !== 'all' || value?.by && value?.by !== 'all' ?
          <div className="w-7">
            <Button
              variant="destructive"
              size="icon-sm"
              className="text-destructive"
              onClick={onClear}>
              <Trash2 />
            </Button>
          </div> : null
        }
      </div>
    </div>
  )
}