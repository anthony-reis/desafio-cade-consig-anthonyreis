import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <Card className="hidden md:block">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Início</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function CardsSkeleton() {
  return (
    <div className="space-y-3 md:hidden">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="space-y-3 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-6 w-16 shrink-0 rounded-full" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="ml-auto h-3 w-10" />
                <Skeleton className="ml-auto h-4 w-20" />
              </div>
            </div>

            <div className="border-t pt-2">
              <Skeleton className="h-3 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
