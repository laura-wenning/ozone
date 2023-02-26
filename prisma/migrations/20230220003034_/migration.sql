-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('CHARACTER', 'LOCATION', 'EVENT', 'KEYWORD');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordAccount" (
    "id" UUID NOT NULL,
    "ownerID" UUID,
    "discordID" INTEGER NOT NULL,
    "tagName" TEXT NOT NULL,
    "tagNumber" INTEGER NOT NULL,

    CONSTRAINT "DiscordAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arc" (
    "id" UUID NOT NULL,
    "universeID" UUID,
    "name" VARCHAR(200) NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "Arc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL,
    "sceneID" UUID,
    "discordAuthorID" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL,
    "isBorder" BOOLEAN NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scene" (
    "id" UUID NOT NULL,
    "arcID" UUID,
    "name" VARCHAR(100) NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "Scene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" "TagType" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Universe" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "Universe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArcToTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SceneToTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_TagToUniverse" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordAccount_discordID_key" ON "DiscordAccount"("discordID");

-- CreateIndex
CREATE UNIQUE INDEX "_ArcToTag_AB_unique" ON "_ArcToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArcToTag_B_index" ON "_ArcToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SceneToTag_AB_unique" ON "_SceneToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_SceneToTag_B_index" ON "_SceneToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToUniverse_AB_unique" ON "_TagToUniverse"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToUniverse_B_index" ON "_TagToUniverse"("B");

-- AddForeignKey
ALTER TABLE "DiscordAccount" ADD CONSTRAINT "DiscordAccount_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arc" ADD CONSTRAINT "Arc_universeID_fkey" FOREIGN KEY ("universeID") REFERENCES "Universe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sceneID_fkey" FOREIGN KEY ("sceneID") REFERENCES "Scene"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_discordAuthorID_fkey" FOREIGN KEY ("discordAuthorID") REFERENCES "DiscordAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_arcID_fkey" FOREIGN KEY ("arcID") REFERENCES "Arc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArcToTag" ADD CONSTRAINT "_ArcToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Arc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArcToTag" ADD CONSTRAINT "_ArcToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SceneToTag" ADD CONSTRAINT "_SceneToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SceneToTag" ADD CONSTRAINT "_SceneToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUniverse" ADD CONSTRAINT "_TagToUniverse_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUniverse" ADD CONSTRAINT "_TagToUniverse_B_fkey" FOREIGN KEY ("B") REFERENCES "Universe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
