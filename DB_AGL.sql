PGDMP      5            	    |            DB_RHM    16.3    16.3 ]    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    74519    DB_RHM    DATABASE     j   CREATE DATABASE "DB_RHM" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE "DB_RHM";
                postgres    false            �            1259    74586 
   Attendance    TABLE     �  CREATE TABLE public."Attendance" (
    id text NOT NULL,
    "employeeId" text NOT NULL,
    date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "checkInTime" time without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "checkOutTime" time without time zone,
    location text,
    notes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text
);
     DROP TABLE public."Attendance";
       public         heap    postgres    false            �            1259    74576    Break    TABLE     �  CREATE TABLE public."Break" (
    id text NOT NULL,
    "employeeId" text NOT NULL,
    "attendanceId" text NOT NULL,
    date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Break" time without time zone DEFAULT CURRENT_TIMESTAMP,
    "EndBreak" time without time zone,
    notes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text
);
    DROP TABLE public."Break";
       public         heap    postgres    false            �            1259    74621    Category    TABLE     �   CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Category";
       public         heap    postgres    false            �            1259    74560 
   Department    TABLE     W  CREATE TABLE public."Department" (
    id text NOT NULL,
    "MarketPlaceId" text NOT NULL,
    name text NOT NULL,
    "managerId" text,
    location text,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text
);
     DROP TABLE public."Department";
       public         heap    postgres    false            �            1259    74541    Employee    TABLE     �  CREATE TABLE public."Employee" (
    id text NOT NULL,
    flag bytea,
    matricule text,
    "MarketPlaceId" text,
    pseudo text,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    "dateOfBirth" text,
    "placeOfBirth" text,
    "phoneNumber" text,
    email text NOT NULL,
    address text,
    gender text,
    "departmentId" text,
    "positionId" text,
    "contractType" text,
    salary text,
    "socialSecurityNumber" text,
    "emergencyContactName" text,
    "emergencyContactlastName" text,
    "emergencyContactEmail" text,
    "emergencyContactPhone" text,
    "emergencyContactAdress" text,
    comments text,
    "roleId" text,
    status text DEFAULT 'Active'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text,
    password text NOT NULL
);
    DROP TABLE public."Employee";
       public         heap    postgres    false            �            1259    74670 	   Inventory    TABLE     G  CREATE TABLE public."Inventory" (
    id text NOT NULL,
    "employeeId" text,
    "inventoryDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    comments text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Inventory";
       public         heap    postgres    false            �            1259    74679    InventoryItem    TABLE     �   CREATE TABLE public."InventoryItem" (
    id text NOT NULL,
    "inventoryId" text NOT NULL,
    "productId" text NOT NULL,
    counted integer NOT NULL,
    difference integer
);
 #   DROP TABLE public."InventoryItem";
       public         heap    postgres    false            �            1259    74551    Leaves    TABLE     )  CREATE TABLE public."Leaves" (
    id text NOT NULL,
    "employeeId" text NOT NULL,
    "leaveType" text NOT NULL,
    "startDate" timestamp(3) without time zone,
    reason text,
    "endDate" timestamp(3) without time zone,
    status text DEFAULT 'En attente'::text NOT NULL,
    "approvalDate" timestamp(3) without time zone,
    "rejectionDate" timestamp(3) without time zone,
    "rejectionReason" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Leaves";
       public         heap    postgres    false            �            1259    74533    MarketPlace    TABLE     �  CREATE TABLE public."MarketPlace" (
    id text NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    "contactEmail" text NOT NULL,
    "contactPhone" text NOT NULL,
    "licenseType" text,
    "maxEmployees" integer NOT NULL,
    "subscriptionStartDate" text NOT NULL,
    "subscriptionEndDate" text,
    website text,
    logo text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 !   DROP TABLE public."MarketPlace";
       public         heap    postgres    false            �            1259    74604    Notification    TABLE     C  CREATE TABLE public."Notification" (
    id text NOT NULL,
    "employeeId" text NOT NULL,
    message text NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text
);
 "   DROP TABLE public."Notification";
       public         heap    postgres    false            �            1259    74637    Order    TABLE     �  CREATE TABLE public."Order" (
    id text NOT NULL,
    "supplierId" text NOT NULL,
    "orderDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "totalAmount" double precision NOT NULL,
    status text DEFAULT 'Pending'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Order";
       public         heap    postgres    false            �            1259    74647 	   OrderItem    TABLE     �   CREATE TABLE public."OrderItem" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "productId" text NOT NULL,
    quantity integer NOT NULL,
    "unitPrice" double precision NOT NULL
);
    DROP TABLE public."OrderItem";
       public         heap    postgres    false            �            1259    74568    Position    TABLE     `  CREATE TABLE public."Position" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    "departmentId" text NOT NULL,
    responsibilities jsonb,
    requirements jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text
);
    DROP TABLE public."Position";
       public         heap    postgres    false            �            1259    74613    Product    TABLE     �  CREATE TABLE public."Product" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    price double precision NOT NULL,
    quantity integer NOT NULL,
    "reorderLevel" integer NOT NULL,
    "categoryId" text NOT NULL,
    "supplierId" text NOT NULL,
    barcode text NOT NULL,
    "expirationDate" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Product";
       public         heap    postgres    false            �            1259    74654    Sale    TABLE     W  CREATE TABLE public."Sale" (
    id text NOT NULL,
    "employeeId" text,
    "saleDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "totalAmount" double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Sale";
       public         heap    postgres    false            �            1259    74663    SaleItem    TABLE     �   CREATE TABLE public."SaleItem" (
    id text NOT NULL,
    "saleId" text NOT NULL,
    "productId" text NOT NULL,
    quantity integer NOT NULL,
    "unitPrice" double precision NOT NULL
);
    DROP TABLE public."SaleItem";
       public         heap    postgres    false            �            1259    74629    Supplier    TABLE     '  CREATE TABLE public."Supplier" (
    id text NOT NULL,
    name text NOT NULL,
    "contactName" text,
    phone text,
    email text,
    address text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Supplier";
       public         heap    postgres    false            �            1259    75903    Task    TABLE     �  CREATE TABLE public."Task" (
    id text NOT NULL,
    "employeeId" text NOT NULL,
    title text NOT NULL,
    description text,
    "dueDate" text,
    "dueTime" text,
    status text DEFAULT 'En attente'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text
);
    DROP TABLE public."Task";
       public         heap    postgres    false            �            1259    74596 	   WorkHours    TABLE     �  CREATE TABLE public."WorkHours" (
    id text NOT NULL,
    "employeeId" text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "hoursWorked" double precision NOT NULL,
    "hourlyRate" double precision NOT NULL,
    "totalPay" double precision NOT NULL,
    "overtimeHours" double precision,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text
);
    DROP TABLE public."WorkHours";
       public         heap    postgres    false            �            1259    74522    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            �          0    74586 
   Attendance 
   TABLE DATA           �   COPY public."Attendance" (id, "employeeId", date, "checkInTime", "checkOutTime", location, notes, "createdAt", "updatedAt", "createdBy") FROM stdin;
    public          postgres    false    222   O�       �          0    74576    Break 
   TABLE DATA           �   COPY public."Break" (id, "employeeId", "attendanceId", date, "Break", "EndBreak", notes, "createdAt", "updatedAt", "createdBy") FROM stdin;
    public          postgres    false    221   l�       �          0    74621    Category 
   TABLE DATA           U   COPY public."Category" (id, name, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    226   ��       �          0    74560 
   Department 
   TABLE DATA           �   COPY public."Department" (id, "MarketPlaceId", name, "managerId", location, description, "createdAt", "updatedAt", "createdBy") FROM stdin;
    public          postgres    false    219   ��       �          0    74541    Employee 
   TABLE DATA           �  COPY public."Employee" (id, flag, matricule, "MarketPlaceId", pseudo, "firstName", "lastName", admin, "dateOfBirth", "placeOfBirth", "phoneNumber", email, address, gender, "departmentId", "positionId", "contractType", salary, "socialSecurityNumber", "emergencyContactName", "emergencyContactlastName", "emergencyContactEmail", "emergencyContactPhone", "emergencyContactAdress", comments, "roleId", status, "createdAt", "updatedAt", "createdBy", password) FROM stdin;
    public          postgres    false    217   z�       �          0    74670 	   Inventory 
   TABLE DATA           l   COPY public."Inventory" (id, "employeeId", "inventoryDate", comments, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    232   ��       �          0    74679    InventoryItem 
   TABLE DATA           ^   COPY public."InventoryItem" (id, "inventoryId", "productId", counted, difference) FROM stdin;
    public          postgres    false    233   ��       �          0    74551    Leaves 
   TABLE DATA           �   COPY public."Leaves" (id, "employeeId", "leaveType", "startDate", reason, "endDate", status, "approvalDate", "rejectionDate", "rejectionReason", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   ��       �          0    74533    MarketPlace 
   TABLE DATA           �   COPY public."MarketPlace" (id, name, address, "contactEmail", "contactPhone", "licenseType", "maxEmployees", "subscriptionStartDate", "subscriptionEndDate", website, logo, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   ג       �          0    74604    Notification 
   TABLE DATA           p   COPY public."Notification" (id, "employeeId", message, read, "createdAt", "updatedAt", "createdBy") FROM stdin;
    public          postgres    false    224   ��       �          0    74637    Order 
   TABLE DATA           q   COPY public."Order" (id, "supplierId", "orderDate", "totalAmount", status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    228   ��       �          0    74647 	   OrderItem 
   TABLE DATA           X   COPY public."OrderItem" (id, "orderId", "productId", quantity, "unitPrice") FROM stdin;
    public          postgres    false    229   ͓       �          0    74568    Position 
   TABLE DATA           �   COPY public."Position" (id, title, description, "departmentId", responsibilities, requirements, "createdAt", "updatedAt", "createdBy") FROM stdin;
    public          postgres    false    220   �       �          0    74613    Product 
   TABLE DATA           �   COPY public."Product" (id, name, description, price, quantity, "reorderLevel", "categoryId", "supplierId", barcode, "expirationDate", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    225   5�       �          0    74654    Sale 
   TABLE DATA           g   COPY public."Sale" (id, "employeeId", "saleDate", "totalAmount", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   R�       �          0    74663    SaleItem 
   TABLE DATA           V   COPY public."SaleItem" (id, "saleId", "productId", quantity, "unitPrice") FROM stdin;
    public          postgres    false    231   o�       �          0    74629    Supplier 
   TABLE DATA           n   COPY public."Supplier" (id, name, "contactName", phone, email, address, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    227   ��       �          0    75903    Task 
   TABLE DATA           �   COPY public."Task" (id, "employeeId", title, description, "dueDate", "dueTime", status, "createdAt", "updatedAt", "createdBy") FROM stdin;
    public          postgres    false    234   ��       �          0    74596 	   WorkHours 
   TABLE DATA           �   COPY public."WorkHours" (id, "employeeId", date, "hoursWorked", "hourlyRate", "totalPay", "overtimeHours", "createdAt", "updatedAt", "createdBy") FROM stdin;
    public          postgres    false    223   ��       �          0    74522    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   ��       �           2606    74595    Attendance Attendance_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Attendance" DROP CONSTRAINT "Attendance_pkey";
       public            postgres    false    222            �           2606    74585    Break Break_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Break"
    ADD CONSTRAINT "Break_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Break" DROP CONSTRAINT "Break_pkey";
       public            postgres    false    221            �           2606    74628    Category Category_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Category" DROP CONSTRAINT "Category_pkey";
       public            postgres    false    226            �           2606    74567    Department Department_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "Department_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Department" DROP CONSTRAINT "Department_pkey";
       public            postgres    false    219            �           2606    74550    Employee Employee_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Employee" DROP CONSTRAINT "Employee_pkey";
       public            postgres    false    217                       2606    74685     InventoryItem InventoryItem_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."InventoryItem"
    ADD CONSTRAINT "InventoryItem_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."InventoryItem" DROP CONSTRAINT "InventoryItem_pkey";
       public            postgres    false    233                       2606    74678    Inventory Inventory_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Inventory" DROP CONSTRAINT "Inventory_pkey";
       public            postgres    false    232            �           2606    74559    Leaves Leaves_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Leaves"
    ADD CONSTRAINT "Leaves_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Leaves" DROP CONSTRAINT "Leaves_pkey";
       public            postgres    false    218            �           2606    74540    MarketPlace MarketPlace_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."MarketPlace"
    ADD CONSTRAINT "MarketPlace_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."MarketPlace" DROP CONSTRAINT "MarketPlace_pkey";
       public            postgres    false    216            �           2606    74612    Notification Notification_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Notification" DROP CONSTRAINT "Notification_pkey";
       public            postgres    false    224            �           2606    74653    OrderItem OrderItem_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."OrderItem" DROP CONSTRAINT "OrderItem_pkey";
       public            postgres    false    229            �           2606    74646    Order Order_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_pkey";
       public            postgres    false    228            �           2606    74575    Position Position_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Position"
    ADD CONSTRAINT "Position_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Position" DROP CONSTRAINT "Position_pkey";
       public            postgres    false    220            �           2606    74620    Product Product_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_pkey";
       public            postgres    false    225                       2606    74669    SaleItem SaleItem_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."SaleItem"
    ADD CONSTRAINT "SaleItem_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."SaleItem" DROP CONSTRAINT "SaleItem_pkey";
       public            postgres    false    231                       2606    74662    Sale Sale_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Sale"
    ADD CONSTRAINT "Sale_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Sale" DROP CONSTRAINT "Sale_pkey";
       public            postgres    false    230            �           2606    74636    Supplier Supplier_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Supplier"
    ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Supplier" DROP CONSTRAINT "Supplier_pkey";
       public            postgres    false    227            	           2606    75911    Task Task_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_pkey";
       public            postgres    false    234            �           2606    74603    WorkHours WorkHours_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."WorkHours"
    ADD CONSTRAINT "WorkHours_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."WorkHours" DROP CONSTRAINT "WorkHours_pkey";
       public            postgres    false    223            �           2606    74530 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            �           1259    74689    Employee_email_key    INDEX     S   CREATE UNIQUE INDEX "Employee_email_key" ON public."Employee" USING btree (email);
 (   DROP INDEX public."Employee_email_key";
       public            postgres    false    217            �           1259    74687    Employee_matricule_key    INDEX     [   CREATE UNIQUE INDEX "Employee_matricule_key" ON public."Employee" USING btree (matricule);
 ,   DROP INDEX public."Employee_matricule_key";
       public            postgres    false    217            �           1259    74688    Employee_pseudo_key    INDEX     U   CREATE UNIQUE INDEX "Employee_pseudo_key" ON public."Employee" USING btree (pseudo);
 )   DROP INDEX public."Employee_pseudo_key";
       public            postgres    false    217            �           1259    74686    MarketPlace_contactEmail_key    INDEX     i   CREATE UNIQUE INDEX "MarketPlace_contactEmail_key" ON public."MarketPlace" USING btree ("contactEmail");
 2   DROP INDEX public."MarketPlace_contactEmail_key";
       public            postgres    false    216            �           1259    74690    Product_barcode_key    INDEX     U   CREATE UNIQUE INDEX "Product_barcode_key" ON public."Product" USING btree (barcode);
 )   DROP INDEX public."Product_barcode_key";
       public            postgres    false    225                       2606    74736 %   Attendance Attendance_employeeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public."Attendance" DROP CONSTRAINT "Attendance_employeeId_fkey";
       public          postgres    false    217    222    3557                       2606    74731    Break Break_attendanceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Break"
    ADD CONSTRAINT "Break_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES public."Attendance"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Break" DROP CONSTRAINT "Break_attendanceId_fkey";
       public          postgres    false    3568    222    221                       2606    74726    Break Break_employeeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Break"
    ADD CONSTRAINT "Break_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Break" DROP CONSTRAINT "Break_employeeId_fkey";
       public          postgres    false    3557    221    217                       2606    74716 (   Department Department_MarketPlaceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "Department_MarketPlaceId_fkey" FOREIGN KEY ("MarketPlaceId") REFERENCES public."MarketPlace"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public."Department" DROP CONSTRAINT "Department_MarketPlaceId_fkey";
       public          postgres    false    3553    216    219                       2606    74711 $   Department Department_managerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Department"
    ADD CONSTRAINT "Department_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 R   ALTER TABLE ONLY public."Department" DROP CONSTRAINT "Department_managerId_fkey";
       public          postgres    false    3557    217    219            
           2606    74691 $   Employee Employee_MarketPlaceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_MarketPlaceId_fkey" FOREIGN KEY ("MarketPlaceId") REFERENCES public."MarketPlace"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 R   ALTER TABLE ONLY public."Employee" DROP CONSTRAINT "Employee_MarketPlaceId_fkey";
       public          postgres    false    217    216    3553                       2606    74701 #   Employee Employee_departmentId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES public."Department"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public."Employee" DROP CONSTRAINT "Employee_departmentId_fkey";
       public          postgres    false    217    219    3562                       2606    74696 !   Employee Employee_positionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES public."Position"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 O   ALTER TABLE ONLY public."Employee" DROP CONSTRAINT "Employee_positionId_fkey";
       public          postgres    false    3564    220    217                       2606    74796 ,   InventoryItem InventoryItem_inventoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."InventoryItem"
    ADD CONSTRAINT "InventoryItem_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES public."Inventory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Z   ALTER TABLE ONLY public."InventoryItem" DROP CONSTRAINT "InventoryItem_inventoryId_fkey";
       public          postgres    false    3589    232    233                        2606    74801 *   InventoryItem InventoryItem_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."InventoryItem"
    ADD CONSTRAINT "InventoryItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 X   ALTER TABLE ONLY public."InventoryItem" DROP CONSTRAINT "InventoryItem_productId_fkey";
       public          postgres    false    3575    225    233                       2606    74791 #   Inventory Inventory_employeeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public."Inventory" DROP CONSTRAINT "Inventory_employeeId_fkey";
       public          postgres    false    217    3557    232                       2606    74706    Leaves Leaves_employeeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Leaves"
    ADD CONSTRAINT "Leaves_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Leaves" DROP CONSTRAINT "Leaves_employeeId_fkey";
       public          postgres    false    217    3557    218                       2606    74746 )   Notification Notification_employeeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 W   ALTER TABLE ONLY public."Notification" DROP CONSTRAINT "Notification_employeeId_fkey";
       public          postgres    false    224    217    3557                       2606    74766     OrderItem OrderItem_orderId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public."OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";
       public          postgres    false    3581    229    228                       2606    74771 "   OrderItem OrderItem_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 P   ALTER TABLE ONLY public."OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";
       public          postgres    false    225    3575    229                       2606    74761    Order Order_supplierId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public."Supplier"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_supplierId_fkey";
       public          postgres    false    227    228    3579                       2606    74721 #   Position Position_departmentId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Position"
    ADD CONSTRAINT "Position_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES public."Department"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public."Position" DROP CONSTRAINT "Position_departmentId_fkey";
       public          postgres    false    219    220    3562                       2606    74751    Product Product_categoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_categoryId_fkey";
       public          postgres    false    225    3577    226                       2606    74756    Product Product_supplierId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public."Supplier"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_supplierId_fkey";
       public          postgres    false    227    3579    225                       2606    74786     SaleItem SaleItem_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."SaleItem"
    ADD CONSTRAINT "SaleItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public."SaleItem" DROP CONSTRAINT "SaleItem_productId_fkey";
       public          postgres    false    231    3575    225                       2606    74781    SaleItem SaleItem_saleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."SaleItem"
    ADD CONSTRAINT "SaleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES public."Sale"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."SaleItem" DROP CONSTRAINT "SaleItem_saleId_fkey";
       public          postgres    false    231    230    3585                       2606    74776    Sale Sale_employeeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Sale"
    ADD CONSTRAINT "Sale_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 G   ALTER TABLE ONLY public."Sale" DROP CONSTRAINT "Sale_employeeId_fkey";
       public          postgres    false    3557    217    230            !           2606    75912    Task Task_employeeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_employeeId_fkey";
       public          postgres    false    3557    234    217                       2606    74741 #   WorkHours WorkHours_employeeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."WorkHours"
    ADD CONSTRAINT "WorkHours_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public."WorkHours" DROP CONSTRAINT "WorkHours_employeeId_fkey";
       public          postgres    false    217    223    3557            �      x������ � �      �      x������ � �      �      x������ � �      �   �   x��νN1���y����^��E
)"@��{^K����������hgF��o0$��5 6��J�'J��D�Q�[��C�̀�@֋�E
j6������}9<�ޙ��le�oe4;}/�I/:N�al�ۥL�Ǘo=������&���u̸�?�7]�d��<�X9G�J_r%G���?��~�97+�b��;����z�W�      �   �  x����r�8���S�"Us%�$K���r������n���f��s십�L�e�*r1*�mu�[��S����"@Tp���9R���'A�Yȁ q��::ʒ�Jc��\JĀd$c(����f�ޗ�g��X�ǳv(��(��~�0�+���E 	&˭�����c��E��U�e�^�{������.���'�uR�U�.��t�/�˫��vRs?RX��VU�sB�	�'i���#��Y���h^��4w�N7�9�=���W��h�t�ˇ��g��R�	�!BXK1J���u(��!��Y�H���3��b����8��y���pbc���������C\�9g�)�6._��NR�~�t��]�0�>�AJF6��DHB`�A $Ӂ1#�PSpm3d�G�[)��]C#�m�{v����s�L!�e���	�}_r��Y�I�j�+����K��U�����6ڌz���c��;V狧ǳ7�Yx��������͢�L�sz�_>yw7e�(��7O�"i)�W��F��r$�@����c��5�eN>5PUk�D�ཨ��NM�L��e!�$�a'7ӵ�_��`y`�Y�"Ĥ��PH�ZE�GB8��l��k�\�9�#(-4;����_nZ��hX䡭�� SB�{Tу��0�?��2��S���·��f~u�9�+u����<|�3����a�L�hˏ	�&�ƈq{�e`��b*��h�ϴ<�N���EV�FWU�%k��#"��^���6�iC�P����-��U�?3}m!���n��cJ��6Ş��?�3f�7�%��$���O#77�����Z�N�g�3�^F2�O�VD�X)I�olp�	A�>�4�Dv��?pGGÝ�y�8}m�vb��d�[5���X���ZW�	T���>�5���qݤj��ΓuG��;(���֯^, ��E��)S��������3��^��JN����r�ʧ��Έ�g�����2�	�pxۿD�h}�Z��?��d�      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x�u�;�0E��*�@ 	/��Zm�ѡI |T�=�7&V�؝�s�5�WiYq	)	�DKDS��PZ�IaogW4�lu[�T�_�<ع��ߩZMm�N��ƻq���&�d�Q*a��,�r$�.�3e!�
��)��y��0�@������N��^x����A�      �      x������ � �      �      x������ � �      �      x������ � �      �   ;  x����N�0E��+��x�8~��!!D��,��K��X����hV�Ѝ��i���^Y`T
h(约�qF]%U�\)|Sgwx¶\ƿ3�K�N3̦ؗ����q5��8ڠ���2q8HcTV<��O$'��s��D�Ф�͕Tכ��R��ʼ=�a$K$.m�!�HB��إ���;���9`����8cC�ҭXV2N��2A*����;U��Ǐi�.�`��)j�,���V��@� ;�����wN���۝���0�,h'�_T�[����Bt��<m�C���<�N�����Ovd}q��9��<��l��      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �  x�ŗ�nG�ϣ���/�AWw��-т -�$��R��I���S�#/�:�J�% AP�ߥ�jcF/=9�z�(�htQ�UZ'� ��{�P����;#4�j0��]��uy�T(@
e���g)���!��MO�]��ʫ��{��:��[��	�R9��\ZeET��w%g�H�R$Qw��fh|���w�i>73r��O�M|�BRJ�`�@��A������C߿Đ�y fF�K��G��g��D�5!`4B��ʒI��K�j �rDJ#gR^���Di�Z�腲�J
�b����@�v���2�����R�69/d�Ep}� �E�k,�$/���L�� '�&�`d��!��r]#(pq���6Azs\JԃQ���Eo�59�s�
qweT29�Hf�ZI�I	��&L�M����|� ��jexFZ-��m�s<.%��M�>�M���D0Nؔ�@o���Sy`�R���%�3բ�ԛ(�BZd�}���Z����m�Q7Sv_�����#�z9���1��͸|�� ��P5���	;N��(��y��k�U�!x:�E��>l8��?;�ϭӛ�O�W������l�_���_�����Ky������;}X��6�?��cO�ԯJ�VK&|�{Ƀb|�Y	ex}0᎛)5S0���V�ҩ��(y,��ߜ�pҨ�Z*M�ӕ� W9)2��E%����9]���/w�{{���O�|,���5��g����}[-��g ���o���A�'��++��+�e�
rOAV.�TK �k�B,T\񼚤��J���UK���~�Kv1?��_]-��a?���#��{gҊ��������}��[��۽Sۦ��d���A�z�UXtU\\�g��#2�Mǝ3h��uA���*�k��W _���0�d�����8�[�	tvs}�`��y��,��ǽ��>�voY~�l������y��A��fRo2������f�      �      x������ � �      �   �   x�m�Kj1D�3��>���[s���`��!!����N��`�]�k�A��a+S���[Y2(g�h�'�ʱ�
���)��c�pu����1e���c%$f[�,��F@R
�ʡt������^HQ��/�_����v�3�����>�]���Q�J[�Ő��;��-�Ug���CRz�����A�F�z���q��ɔ��mH ���
;��S�=3yXoH�k�����9�(��an�gp>����[~     