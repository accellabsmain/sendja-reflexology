"use client";
import { THERAPISTS, ROOMS } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BedDouble } from "lucide-react";

export default function StaffPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="font-serif text-3xl text-text-main">Staff & Rooms</h1>
        <p className="text-text-muted mt-1">Manage therapists and treatment rooms.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-surface-1 border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-text-mid">Total Therapists</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-main">{THERAPISTS.length}</div>
            <p className="text-xs text-text-muted mt-1">Active staff members</p>
          </CardContent>
        </Card>
        <Card className="bg-surface-1 border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-text-mid">Total Rooms</CardTitle>
            <BedDouble className="w-4 h-4 text-accent-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-main">{ROOMS.length}</div>
            <p className="text-xs text-text-muted mt-1">Available treatment rooms</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-serif text-xl text-text-main">Therapists</h2>
          <div className="bg-surface-1 border border-border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-surface-2">
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-text-mid">ID</TableHead>
                  <TableHead className="text-text-mid">Name</TableHead>
                  <TableHead className="text-text-mid">Expertise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {THERAPISTS.map((t) => (
                  <TableRow key={t.id} className="border-border hover:bg-surface-2 transition-colors">
                    <TableCell className="text-text-muted text-sm">{t.id}</TableCell>
                    <TableCell className="font-medium text-text-main">{t.name}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-sm ${
                        t.expertise === 'Senior' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface-2 text-text-muted border border-border'
                      }`}>
                        {t.expertise}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-xl text-text-main">Treatment Rooms</h2>
          <div className="bg-surface-1 border border-border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-surface-2">
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-text-mid">ID</TableHead>
                  <TableHead className="text-text-mid">Room Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROOMS.map((r) => (
                  <TableRow key={r.id} className="border-border hover:bg-surface-2 transition-colors">
                    <TableCell className="text-text-muted text-sm">{r.id}</TableCell>
                    <TableCell className="font-medium text-text-main">{r.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
