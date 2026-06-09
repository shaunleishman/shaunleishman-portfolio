"use client";

import { useMemo, useState } from "react";
import Avatar from "../../../imports/Avatar";
import Icons from "../../../imports/Icons";
import IconSquareRounded from "../../../imports/IconSquareRounded";
import { useComponentSectionCode } from "../ComponentSectionContext";
import { ComponentVariantToolbar, VariantPreviewFrame } from "../ComponentVariantToolbar";

type IconCategory = "icon" | "container" | "avatar";

const ICON_STATES = ["Primary", "Dark", "Reverse", "Disabled", "Error", "Caution", "Success"] as const;
const ICON_SIZES = ["Tiny", "xs", "Small", "Medium", "Large", "xl"] as const;
const CONTAINER_VARIANTS = ["Square", "Circle", "Icon3", "Icon4"] as const;
const AVATAR_SHAPES = ["Circle", "Rounded"] as const;
const AVATAR_TYPES = ["Text", "Icon"] as const;
const AVATAR_SIZES = ["x-small", "Small", "Medium", "Large"] as const;
const AVATAR_COLOURS = ["Primary", "Dark", "Reverse"] as const;

export function InteractiveIconsDemo() {
  const [category, setCategory] = useState<IconCategory>("icon");
  const [iconState, setIconState] = useState<(typeof ICON_STATES)[number]>("Primary");
  const [iconSize, setIconSize] = useState<(typeof ICON_SIZES)[number]>("Medium");
  const [container, setContainer] = useState<(typeof CONTAINER_VARIANTS)[number]>("Square");
  const [avatarShape, setAvatarShape] = useState<(typeof AVATAR_SHAPES)[number]>("Circle");
  const [avatarType, setAvatarType] = useState<(typeof AVATAR_TYPES)[number]>("Text");
  const [avatarSize, setAvatarSize] = useState<(typeof AVATAR_SIZES)[number]>("Medium");
  const [avatarColour, setAvatarColour] = useState<(typeof AVATAR_COLOURS)[number]>("Primary");
  const [showAll, setShowAll] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  const filters = useMemo(() => {
    const categoryFilter = {
      id: "category",
      label: "Component",
      value: category,
      onChange: (value: string) => setCategory(value as IconCategory),
      options: [
        { value: "icon", label: "Icon" },
        { value: "container", label: "Icon container" },
        { value: "avatar", label: "Avatar" },
      ],
    };

    if (category === "icon") {
      return [
        categoryFilter,
        {
          id: "state",
          label: "State",
          value: iconState,
          onChange: (value: string) => setIconState(value as (typeof ICON_STATES)[number]),
          options: ICON_STATES.map((state) => ({ value: state, label: state })),
        },
        {
          id: "size",
          label: "Size",
          value: iconSize,
          onChange: (value: string) => setIconSize(value as (typeof ICON_SIZES)[number]),
          options: ICON_SIZES.map((size) => ({ value: size, label: size })),
        },
      ];
    }

    if (category === "container") {
      return [
        categoryFilter,
        {
          id: "variant",
          label: "Variant",
          value: container,
          onChange: (value: string) => setContainer(value as (typeof CONTAINER_VARIANTS)[number]),
          options: CONTAINER_VARIANTS.map((variant) => ({ value: variant, label: variant })),
        },
      ];
    }

    return [
      categoryFilter,
      {
        id: "shape",
        label: "Shape",
        value: avatarShape,
        onChange: (value: string) => setAvatarShape(value as (typeof AVATAR_SHAPES)[number]),
        options: AVATAR_SHAPES.map((shape) => ({ value: shape, label: shape })),
      },
      {
        id: "type",
        label: "Type",
        value: avatarType,
        onChange: (value: string) => setAvatarType(value as (typeof AVATAR_TYPES)[number]),
        options: AVATAR_TYPES.map((type) => ({ value: type, label: type })),
      },
      {
        id: "size",
        label: "Size",
        value: avatarSize,
        onChange: (value: string) => setAvatarSize(value as (typeof AVATAR_SIZES)[number]),
        options: AVATAR_SIZES.map((size) => ({ value: size, label: size })),
      },
      {
        id: "colour",
        label: "Colour",
        value: avatarColour,
        onChange: (value: string) => setAvatarColour(value as (typeof AVATAR_COLOURS)[number]),
        options: AVATAR_COLOURS.map((colour) => ({ value: colour, label: colour })),
      },
    ];
  }, [category, iconState, iconSize, container, avatarShape, avatarType, avatarSize, avatarColour]);

  const preview = useMemo(() => {
    if (category === "icon") return <Icons icon={iconState} size={iconSize} />;
    if (category === "container") return <IconSquareRounded icon={container} />;
    return (
      <Avatar
        colour={avatarColour}
        size={avatarSize}
        shape={avatarShape}
        type={avatarType}
      />
    );
  }, [category, iconState, iconSize, container, avatarColour, avatarSize, avatarShape, avatarType]);

  const liveCode = useMemo(() => {
    if (category === "icon") {
      return `import Icons from './imports/Icons';

<Icons icon="${iconState}" size="${iconSize}" />`;
    }
    if (category === "container") {
      return `import IconSquareRounded from './imports/IconSquareRounded';

<IconSquareRounded icon="${container}" />`;
    }
    return `import Avatar from './imports/Avatar';

<Avatar colour="${avatarColour}" size="${avatarSize}" shape="${avatarShape}" type="${avatarType}" />`;
  }, [category, iconState, iconSize, container, avatarColour, avatarSize, avatarShape, avatarType]);

  const label =
    category === "icon"
      ? `Icon · ${iconState} · ${iconSize}`
      : category === "container"
        ? `Container · ${container}`
        : `Avatar · ${avatarShape} · ${avatarType} · ${avatarSize}`;

  useComponentSectionCode(liveCode, !showAll);

  return (
    <div>
      <ComponentVariantToolbar showAll={showAll} onShowAllChange={setShowAll} filters={filters} />

      {showAll ? (
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--colour-labels-neutral)]">Icon states</h3>
            <div className="flex flex-wrap gap-4">
              {ICON_STATES.map((state) => (
                <Icons key={state} icon={state} size="Medium" />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--colour-labels-neutral)]">Icon sizes</h3>
            <div className="flex flex-wrap items-end gap-4">
              {ICON_SIZES.map((size) => (
                <Icons key={size} icon="Primary" size={size} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--colour-labels-neutral)]">Containers</h3>
            <div className="flex flex-wrap gap-4">
              {CONTAINER_VARIANTS.map((variant) => (
                <IconSquareRounded key={variant} icon={variant} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-base font-semibold text-[var(--colour-labels-neutral)]">Avatars</h3>
            <div className="flex flex-wrap gap-4">
              {AVATAR_SIZES.map((size) => (
                <Avatar key={size} colour="Primary" size={size} shape="Circle" type="Text" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <VariantPreviewFrame label={label}>
            <button
              type="button"
              onClick={() => setStatus(`Selected ${label}`)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="border-0 bg-transparent p-2 transition-opacity hover:opacity-80"
              style={{ opacity: hovered ? 0.85 : 1 }}
            >
              {preview}
            </button>
          </VariantPreviewFrame>
          {status && (
            <p className="mt-4 text-sm text-[#4a5453]" role="status">
              {status}
            </p>
          )}
        </>
      )}
    </div>
  );
}
