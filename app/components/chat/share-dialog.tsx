'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Share2, Copy, Eye, Clock, ExternalLink } from 'lucide-react'

interface ShareDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    conversationId: string
    conversationTitle: string
}

export default function ShareDialog({
    open,
    onOpenChange,
    conversationId,
    conversationTitle
}: ShareDialogProps) {
    const [shareTitle, setShareTitle] = useState(conversationTitle)
    const [expiresInDays, setExpiresInDays] = useState<number | null>(null)
    const [isSharing, setIsSharing] = useState(false)
    const [shareUrl, setShareUrl] = useState<string | null>(null)
    const [shareData, setShareData] = useState<{
        shareId: string
        shareUrl: string
        expiresAt?: string
        viewCount?: number
    } | null>(null)

    const handleShare = async () => {
        setIsSharing(true)
        try {
            const response = await fetch(`/api/conversations/${conversationId}/share`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: shareTitle,
                    expiresInDays
                })
            })

            if (!response.ok) {
                throw new Error('シェアの作成に失敗しました')
            }

            const data = await response.json()
            setShareData(data)
            setShareUrl(data.shareUrl)
        } catch (error) {
            console.error('Share error:', error)
            alert('シェアの作成に失敗しました')
        } finally {
            setIsSharing(false)
        }
    }

    const handleCopyUrl = () => {
        if (shareUrl) {
            navigator.clipboard.writeText(shareUrl)
            alert('URLをコピーしました！')
        }
    }

    const handleDeleteShare = async () => {
        try {
            const response = await fetch(`/api/conversations/${conversationId}/share`, {
                method: 'DELETE'
            })

            if (response.ok) {
                setShareData(null)
                setShareUrl(null)
                alert('シェアを削除しました')
            }
        } catch (error) {
            console.error('Delete share error:', error)
            alert('シェア削除に失敗しました')
        }
    }

    // 既存のシェア情報を取得
    React.useEffect(() => {
        if (open && conversationId) {
            const fetchShareInfo = async () => {
                try {
                    const response = await fetch(`/api/conversations/${conversationId}/share`)
                    if (response.ok) {
                        const data = await response.json()
                        if (data.shared) {
                            setShareData(data)
                            setShareUrl(data.shareUrl)
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch share info:', error)
                }
            }
            fetchShareInfo()
        }
    }, [open, conversationId])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <Share2 className="w-5 h-5" />
                        <span>会話をシェア</span>
                    </DialogTitle>
                    <DialogDescription>
                        この会話を他の人と共有できます。URLを知っている人は誰でも閲覧できます。
                    </DialogDescription>
                </DialogHeader>

                {shareData ? (
                    <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-green-800">シェア中</span>
                                <div className="flex items-center space-x-2">
                                    {shareData.viewCount !== undefined && (
                                        <Badge variant="outline" className="text-green-700">
                                            <Eye className="w-3 h-3 mr-1" />
                                            {shareData.viewCount} views
                                        </Badge>
                                    )}
                                    {shareData.expiresAt && (
                                        <Badge variant="outline" className="text-amber-700">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {new Date(shareData.expiresAt).toLocaleDateString('ja-JP')} まで
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Input
                                    value={shareData.shareUrl}
                                    readOnly
                                    className="text-sm bg-white"
                                />
                                <Button variant="outline" size="sm" onClick={handleCopyUrl}>
                                    <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(shareData.shareUrl, '_blank')}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <Button variant="outline" onClick={handleDeleteShare} className="flex-1">
                                シェアを削除
                            </Button>
                            <Button onClick={() => onOpenChange(false)} className="flex-1">
                                閉じる
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="share-title">シェアのタイトル</Label>
                            <Input
                                id="share-title"
                                value={shareTitle}
                                onChange={(e) => setShareTitle(e.target.value)}
                                placeholder="会話のタイトル"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expires">有効期限</Label>
                            <Select
                                value={expiresInDays?.toString() || 'never'}
                                onValueChange={(value) => setExpiresInDays(value === 'never' ? null : parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="有効期限を選択" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="never">無期限</SelectItem>
                                    <SelectItem value="1">1日</SelectItem>
                                    <SelectItem value="7">1週間</SelectItem>
                                    <SelectItem value="30">1ヶ月</SelectItem>
                                    <SelectItem value="90">3ヶ月</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <DialogFooter className="flex space-x-2">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>
                                キャンセル
                            </Button>
                            <Button onClick={handleShare} disabled={isSharing}>
                                {isSharing ? '作成中...' : 'シェアを作成'}
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
} 